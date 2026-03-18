import { apiCall, formatResponse } from "../client.js";
import type { ToolDefinition } from "../types.js";

export const whoisTools: ToolDefinition[] = [
  {
    tool: {
      name: "private_whois_enable",
      description: "Enable private WHOIS protection for a domain",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to enable private WHOIS for",
          },
          type: {
            type: "string",
            description: "Type of WHOIS privacy: FULL or PARTIAL",
            enum: ["FULL", "PARTIAL"],
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: args.domain as string,
      };
      if (args.type !== undefined) {
        params.Type = args.type as string;
      }
      const result = await apiCall("/Domain/PrivateWhois/Enable", params);
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "private_whois_disable",
      description: "Disable private WHOIS protection for a domain",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to disable private WHOIS for",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: args.domain as string,
      };
      const result = await apiCall("/Domain/PrivateWhois/Disable", params);
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "private_whois_status",
      description: "Get the current private WHOIS protection status for a domain",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to check private WHOIS status for",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: args.domain as string,
      };
      const result = await apiCall("/Domain/PrivateWhois/Status", params);
      return formatResponse(result);
    },
  },
];
