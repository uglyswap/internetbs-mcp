import { apiCall, formatResponse } from "../client.js";
import type { ToolDefinition } from "../types.js";

export const forwardingTools: ToolDefinition[] = [
  // ─── URL Forwarding ───────────────────────────────────────────────

  {
    tool: {
      name: "url_forward_add",
      description:
        "Add a URL forwarding rule for a domain. The source URL will redirect or frame to the destination URL.",
      inputSchema: {
        type: "object",
        properties: {
          source: {
            type: "string",
            description:
              'The source URL to forward from (e.g. "http://www.example.com")',
          },
          destination: {
            type: "string",
            description: "The destination URL to forward to",
          },
          isFramed: {
            type: "string",
            description:
              "Whether to use framing (YES/NO, default YES). If YES, the destination is displayed in a frame. If NO, a redirect is used.",
          },
          siteTitle: {
            type: "string",
            description:
              "Title for the framed page (only applicable when isFramed=YES)",
          },
          metaDescription: {
            type: "string",
            description:
              "Meta description for the framed page (only applicable when isFramed=YES)",
          },
          metaKeywords: {
            type: "string",
            description:
              "Meta keywords for the framed page (only applicable when isFramed=YES)",
          },
          redirect301: {
            type: "string",
            description:
              "Whether to use a 301 permanent redirect instead of 302 (YES/NO). Only applicable when isFramed=NO.",
          },
        },
        required: ["source", "destination"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Source: args.source as string,
        Destination: args.destination as string,
      };
      if (args.isFramed !== undefined)
        params.isFramed = args.isFramed as string;
      if (args.siteTitle !== undefined)
        params.siteTitle = args.siteTitle as string;
      if (args.metaDescription !== undefined)
        params.metaDescription = args.metaDescription as string;
      if (args.metaKeywords !== undefined)
        params.metaKeywords = args.metaKeywords as string;
      if (args.redirect301 !== undefined)
        params.redirect301 = args.redirect301 as string;

      const result = await apiCall("/Domain/UrlForward/Add", params);
      return formatResponse(result);
    },
  },

  {
    tool: {
      name: "url_forward_update",
      description:
        "Update an existing URL forwarding rule. Only the source is required; all other fields are optional and only provided values will be updated.",
      inputSchema: {
        type: "object",
        properties: {
          source: {
            type: "string",
            description: "The source URL of the forwarding rule to update",
          },
          destination: {
            type: "string",
            description: "The new destination URL",
          },
          isFramed: {
            type: "string",
            description: "Whether to use framing (YES/NO)",
          },
          siteTitle: {
            type: "string",
            description: "Title for the framed page",
          },
          metaDescription: {
            type: "string",
            description: "Meta description for the framed page",
          },
          metaKeywords: {
            type: "string",
            description: "Meta keywords for the framed page",
          },
          redirect301: {
            type: "string",
            description:
              "Whether to use a 301 permanent redirect (YES/NO)",
          },
        },
        required: ["source"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Source: args.source as string,
      };
      if (args.destination !== undefined)
        params.Destination = args.destination as string;
      if (args.isFramed !== undefined)
        params.isFramed = args.isFramed as string;
      if (args.siteTitle !== undefined)
        params.siteTitle = args.siteTitle as string;
      if (args.metaDescription !== undefined)
        params.metaDescription = args.metaDescription as string;
      if (args.metaKeywords !== undefined)
        params.metaKeywords = args.metaKeywords as string;
      if (args.redirect301 !== undefined)
        params.redirect301 = args.redirect301 as string;

      const result = await apiCall("/Domain/UrlForward/Update", params);
      return formatResponse(result);
    },
  },

  {
    tool: {
      name: "url_forward_remove",
      description: "Remove a URL forwarding rule for the given source URL.",
      inputSchema: {
        type: "object",
        properties: {
          source: {
            type: "string",
            description: "The source URL of the forwarding rule to remove",
          },
        },
        required: ["source"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Source: args.source as string,
      };

      const result = await apiCall("/Domain/UrlForward/Remove", params);
      return formatResponse(result);
    },
  },

  {
    tool: {
      name: "url_forward_list",
      description:
        "List all URL forwarding rules configured for a domain.",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description:
              "The domain name to list URL forwarding rules for (e.g. example.com)",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: args.domain as string,
      };

      const result = await apiCall("/Domain/UrlForward/List", params);
      return formatResponse(result);
    },
  },

  // ─── Email Forwarding ─────────────────────────────────────────────

  {
    tool: {
      name: "email_forward_add",
      description:
        "Add an email forwarding rule. Emails sent to the source address will be forwarded to the destination address.",
      inputSchema: {
        type: "object",
        properties: {
          source: {
            type: "string",
            description:
              'The source email address to forward from (e.g. "info@example.com")',
          },
          destination: {
            type: "string",
            description:
              "The destination email address to forward to",
          },
        },
        required: ["source", "destination"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Source: args.source as string,
        Destination: args.destination as string,
      };

      const result = await apiCall("/Domain/EmailForward/Add", params);
      return formatResponse(result);
    },
  },

  {
    tool: {
      name: "email_forward_update",
      description:
        "Update an existing email forwarding rule with a new destination address.",
      inputSchema: {
        type: "object",
        properties: {
          source: {
            type: "string",
            description:
              "The source email address of the forwarding rule to update",
          },
          destination: {
            type: "string",
            description: "The new destination email address",
          },
        },
        required: ["source", "destination"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Source: args.source as string,
        Destination: args.destination as string,
      };

      const result = await apiCall("/Domain/EmailForward/Update", params);
      return formatResponse(result);
    },
  },

  {
    tool: {
      name: "email_forward_remove",
      description:
        "Remove an email forwarding rule for the given source email address.",
      inputSchema: {
        type: "object",
        properties: {
          source: {
            type: "string",
            description:
              "The source email address of the forwarding rule to remove",
          },
        },
        required: ["source"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Source: args.source as string,
      };

      const result = await apiCall("/Domain/EmailForward/Remove", params);
      return formatResponse(result);
    },
  },

  {
    tool: {
      name: "email_forward_list",
      description:
        "List all email forwarding rules configured for a domain.",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description:
              "The domain name to list email forwarding rules for (e.g. example.com)",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: args.domain as string,
      };

      const result = await apiCall("/Domain/EmailForward/List", params);
      return formatResponse(result);
    },
  },
];
