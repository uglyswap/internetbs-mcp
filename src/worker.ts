/**
 * Cloudflare Worker entry point for Internet.bs MCP Server
 * Implements MCP Streamable HTTP transport (stateless mode)
 *
 * Each user passes their own Internet.bs credentials via HTTP headers:
 *   X-InternetBS-Key: their-api-key
 *   X-InternetBS-Password: their-password
 *   X-InternetBS-URL: https://api.internet.bs  (optional, defaults to production)
 */

import { setConfig } from "./client.js";
import { allTools } from "./tools/index.js";

interface Env {
  MCP_AUTH_TOKEN?: string;
}

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: string | number | null;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

const PROTOCOL_VERSION = "2025-03-26";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Mcp-Session-Id, Accept, X-InternetBS-Key, X-InternetBS-Password, X-InternetBS-URL",
  "Access-Control-Expose-Headers": "Mcp-Session-Id",
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}

function errorResponse(
  id: string | number | null,
  code: number,
  message: string
): Response {
  const body: JsonRpcResponse = {
    jsonrpc: "2.0",
    id,
    error: { code, message },
  };
  return jsonResponse(body, code === -32600 ? 400 : 200);
}

// Methods that don't require Internet.bs credentials
const PUBLIC_METHODS = new Set([
  "initialize",
  "notifications/initialized",
  "notifications/cancelled",
  "tools/list",
  "ping",
]);

function needsCredentials(body: unknown): boolean {
  if (Array.isArray(body)) {
    return (body as JsonRpcRequest[]).some(
      (req) => !PUBLIC_METHODS.has(req.method)
    );
  }
  return !PUBLIC_METHODS.has((body as JsonRpcRequest).method);
}

function handleInitialize(req: JsonRpcRequest): JsonRpcResponse {
  return {
    jsonrpc: "2.0",
    id: req.id ?? null,
    result: {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: {
        tools: {},
      },
      serverInfo: {
        name: "internetbs-mcp",
        version: "1.0.0",
      },
    },
  };
}

function handleToolsList(req: JsonRpcRequest): JsonRpcResponse {
  return {
    jsonrpc: "2.0",
    id: req.id ?? null,
    result: {
      tools: allTools.map((t) => t.tool),
    },
  };
}

async function handleToolsCall(
  req: JsonRpcRequest
): Promise<JsonRpcResponse> {
  const params = req.params as
    | { name: string; arguments?: Record<string, unknown> }
    | undefined;

  if (!params?.name) {
    return {
      jsonrpc: "2.0",
      id: req.id ?? null,
      error: { code: -32602, message: "Missing tool name" },
    };
  }

  const toolDef = allTools.find((t) => t.tool.name === params.name);
  if (!toolDef) {
    return {
      jsonrpc: "2.0",
      id: req.id ?? null,
      error: { code: -32602, message: `Unknown tool: ${params.name}` },
    };
  }

  try {
    const result = await toolDef.handler(
      (params.arguments ?? {}) as Record<string, unknown>
    );
    return {
      jsonrpc: "2.0",
      id: req.id ?? null,
      result: {
        content: [{ type: "text", text: result }],
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      jsonrpc: "2.0",
      id: req.id ?? null,
      result: {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true,
      },
    };
  }
}

async function handleJsonRpcRequest(
  req: JsonRpcRequest
): Promise<JsonRpcResponse | null> {
  // Notifications (no id) don't get a response
  if (req.id === undefined || req.id === null) {
    return null;
  }

  switch (req.method) {
    case "initialize":
      return handleInitialize(req);
    case "tools/list":
      return handleToolsList(req);
    case "tools/call":
      return handleToolsCall(req);
    case "ping":
      return { jsonrpc: "2.0", id: req.id, result: {} };
    default:
      return {
        jsonrpc: "2.0",
        id: req.id,
        error: { code: -32601, message: `Method not found: ${req.method}` },
      };
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    // Health check
    if (url.pathname === "/health" && request.method === "GET") {
      return jsonResponse({ status: "ok", tools: allTools.length });
    }

    // Only /mcp endpoint
    if (url.pathname !== "/mcp") {
      return jsonResponse(
        { error: "Not found. Use POST /mcp for MCP requests." },
        404
      );
    }

    // Optional server-level auth (if the operator sets MCP_AUTH_TOKEN)
    if (env.MCP_AUTH_TOKEN) {
      const auth = request.headers.get("Authorization");
      if (auth !== `Bearer ${env.MCP_AUTH_TOKEN}`) {
        return jsonResponse({ error: "Unauthorized" }, 401);
      }
    }

    // GET /mcp - SSE stream (not needed for stateless)
    if (request.method === "GET") {
      return jsonResponse(
        {
          error:
            "This is a stateless MCP server. Use POST /mcp with JSON-RPC requests.",
        },
        405
      );
    }

    // DELETE /mcp - Session close (not needed for stateless)
    if (request.method === "DELETE") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // POST /mcp only
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    // Parse JSON-RPC body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return errorResponse(null, -32700, "Parse error: invalid JSON");
    }

    // Read user credentials from headers (required for tool calls)
    if (needsCredentials(body)) {
      const apiKey = request.headers.get("X-InternetBS-Key");
      const password = request.headers.get("X-InternetBS-Password");

      if (!apiKey || !password) {
        return jsonResponse(
          {
            error:
              "Missing credentials. Set headers: X-InternetBS-Key and X-InternetBS-Password",
            hint: {
              "X-InternetBS-Key": "Your Internet.bs API key",
              "X-InternetBS-Password": "Your Internet.bs API password",
              "X-InternetBS-URL":
                "(optional) https://api.internet.bs or https://testapi.internet.bs",
            },
          },
          401
        );
      }

      const apiUrl =
        request.headers.get("X-InternetBS-URL") || "https://api.internet.bs";

      setConfig({ apiKey, password, apiUrl });
    }

    // Batch request
    if (Array.isArray(body)) {
      const results: JsonRpcResponse[] = [];
      for (const req of body as JsonRpcRequest[]) {
        const res = await handleJsonRpcRequest(req);
        if (res) results.push(res);
      }
      if (results.length === 0) {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
      }
      return jsonResponse(results);
    }

    // Single request
    const rpcReq = body as JsonRpcRequest;
    if (!rpcReq.jsonrpc || rpcReq.jsonrpc !== "2.0") {
      return errorResponse(
        null,
        -32600,
        "Invalid JSON-RPC: missing jsonrpc 2.0"
      );
    }

    const result = await handleJsonRpcRequest(rpcReq);
    if (!result) {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    return jsonResponse(result);
  },
};
