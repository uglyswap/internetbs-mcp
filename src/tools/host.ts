import { apiCall, formatResponse } from "../client.js";
import type { ToolDefinition } from "../types.js";

export const hostTools: ToolDefinition[] = [
  {
    tool: {
      name: "host_create",
      description: "Create a nameserver host (glue record)",
      inputSchema: {
        type: "object",
        properties: {
          host: {
            type: "string",
            description:
              "The hostname to create (e.g. ns1.example.com)",
          },
          ipList: {
            type: "string",
            description:
              "Comma-separated list of IP addresses for the host",
          },
        },
        required: ["host", "ipList"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Host: args.host as string,
        IP_List: args.ipList as string,
      };
      const response = await apiCall("/Domain/Host/Create", params);
      return formatResponse(response);
    },
  },
  {
    tool: {
      name: "host_info",
      description: "Get information about a nameserver host",
      inputSchema: {
        type: "object",
        properties: {
          host: {
            type: "string",
            description: "The hostname to get information for",
          },
        },
        required: ["host"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Host: args.host as string,
      };
      const response = await apiCall("/Domain/Host/Info", params);
      return formatResponse(response);
    },
  },
  {
    tool: {
      name: "host_update",
      description: "Update the IP addresses of a nameserver host",
      inputSchema: {
        type: "object",
        properties: {
          host: {
            type: "string",
            description: "The hostname to update",
          },
          ipList: {
            type: "string",
            description:
              "Comma-separated list of new IP addresses for the host",
          },
        },
        required: ["host", "ipList"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Host: args.host as string,
        IP_List: args.ipList as string,
      };
      const response = await apiCall("/Domain/Host/Update", params);
      return formatResponse(response);
    },
  },
  {
    tool: {
      name: "host_delete",
      description: "Delete a nameserver host",
      inputSchema: {
        type: "object",
        properties: {
          host: {
            type: "string",
            description: "The hostname to delete",
          },
        },
        required: ["host"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Host: args.host as string,
      };
      const response = await apiCall("/Domain/Host/Delete", params);
      return formatResponse(response);
    },
  },
  {
    tool: {
      name: "host_list",
      description: "List all nameserver hosts for a domain",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description: "The domain name to list hosts for",
          },
          compactList: {
            type: "string",
            description:
              "Return a compact list (YES or NO, defaults to YES)",
            enum: ["YES", "NO"],
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: args.domain as string,
      };
      if (args.compactList !== undefined) {
        params.CompactList = args.compactList as string;
      }
      const response = await apiCall("/Domain/Host/List", params);
      return formatResponse(response);
    },
  },
];
