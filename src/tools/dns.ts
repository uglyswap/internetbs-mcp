import { apiCall, formatResponse } from "../client.js";
import type { ToolDefinition } from "../types.js";

export const dnsTools: ToolDefinition[] = [
  {
    tool: {
      name: "dns_record_add",
      description: "Add a DNS record to a domain",
      inputSchema: {
        type: "object",
        properties: {
          fullRecordName: {
            type: "string",
            description:
              "The full record name including the domain (e.g. www.example.com)",
          },
          type: {
            type: "string",
            description: "The DNS record type",
            enum: ["A", "AAAA", "CNAME", "MX", "TXT", "SRV", "NS"],
          },
          value: {
            type: "string",
            description: "The value for the DNS record",
          },
          priority: {
            type: "string",
            description: "Priority value (required for MX and SRV records)",
          },
          ttl: {
            type: "string",
            description: "Time to live in seconds",
          },
        },
        required: ["fullRecordName", "type", "value"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        FullRecordName: args.fullRecordName as string,
        Type: args.type as string,
        Value: args.value as string,
      };
      if (args.priority !== undefined) {
        params.Priority = args.priority as string;
      }
      if (args.ttl !== undefined) {
        params.TTL = args.ttl as string;
      }
      const response = await apiCall("/Domain/DnsRecord/Add", params);
      return formatResponse(response);
    },
  },
  {
    tool: {
      name: "dns_record_remove",
      description: "Remove a DNS record from a domain",
      inputSchema: {
        type: "object",
        properties: {
          fullRecordName: {
            type: "string",
            description:
              "The full record name including the domain (e.g. www.example.com)",
          },
          type: {
            type: "string",
            description: "The DNS record type",
            enum: ["A", "AAAA", "CNAME", "MX", "TXT", "SRV", "NS"],
          },
          value: {
            type: "string",
            description: "The value of the DNS record to remove",
          },
        },
        required: ["fullRecordName", "type", "value"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        FullRecordName: args.fullRecordName as string,
        Type: args.type as string,
        Value: args.value as string,
      };
      const response = await apiCall("/Domain/DnsRecord/Remove", params);
      return formatResponse(response);
    },
  },
  {
    tool: {
      name: "dns_record_update",
      description: "Update an existing DNS record",
      inputSchema: {
        type: "object",
        properties: {
          fullRecordName: {
            type: "string",
            description:
              "The full record name including the domain (e.g. www.example.com)",
          },
          type: {
            type: "string",
            description: "The DNS record type",
            enum: ["A", "AAAA", "CNAME", "MX", "TXT", "SRV", "NS"],
          },
          currentValue: {
            type: "string",
            description:
              "The current value of the record to identify which record to update",
          },
          newValue: {
            type: "string",
            description: "The new value for the DNS record",
          },
          priority: {
            type: "string",
            description: "Priority value (for MX and SRV records)",
          },
          ttl: {
            type: "string",
            description: "Time to live in seconds",
          },
        },
        required: ["fullRecordName", "type", "currentValue", "newValue"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        FullRecordName: args.fullRecordName as string,
        Type: args.type as string,
        CurrentValue: args.currentValue as string,
        NewValue: args.newValue as string,
      };
      if (args.priority !== undefined) {
        params.Priority = args.priority as string;
      }
      if (args.ttl !== undefined) {
        params.TTL = args.ttl as string;
      }
      const response = await apiCall("/Domain/DnsRecord/Update", params);
      return formatResponse(response);
    },
  },
  {
    tool: {
      name: "dns_record_list",
      description: "List all DNS records for a domain",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description: "The domain name to list DNS records for",
          },
          filterType: {
            type: "string",
            description: "Filter results by record type (e.g. A, CNAME, MX)",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: args.domain as string,
      };
      if (args.filterType !== undefined) {
        params.FilterType = args.filterType as string;
      }
      const response = await apiCall("/Domain/DnsRecord/List", params);
      return formatResponse(response);
    },
  },
];
