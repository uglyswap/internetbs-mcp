import { apiCall, formatResponse } from "../client.js";
import type { ToolDefinition } from "../types.js";

export const lockTools: ToolDefinition[] = [
  {
    tool: {
      name: "registrar_lock_enable",
      description: "Enable registrar lock for a domain to prevent unauthorized transfers",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to enable registrar lock for",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: args.domain as string,
      };
      const result = await apiCall("/Domain/RegistrarLock/Enable", params);
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "registrar_lock_disable",
      description: "Disable registrar lock for a domain to allow transfers",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to disable registrar lock for",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: args.domain as string,
      };
      const result = await apiCall("/Domain/RegistrarLock/Disable", params);
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "registrar_lock_status",
      description: "Get the current registrar lock status for a domain",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to check registrar lock status for",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: args.domain as string,
      };
      const result = await apiCall("/Domain/RegistrarLock/Status", params);
      return formatResponse(result);
    },
  },
];
