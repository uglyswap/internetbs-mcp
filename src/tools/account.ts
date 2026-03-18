import { apiCall, formatResponse } from "../client.js";
import type { ToolDefinition } from "../types.js";

export const accountTools: ToolDefinition[] = [
  {
    tool: {
      name: "account_balance",
      description: "Get the current account balance",
      inputSchema: {
        type: "object" as const,
        properties: {
          currency: {
            type: "string",
            description: "Currency for the balance (e.g. USD, EUR, GBP)",
          },
        },
        required: [],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {};
      if (args.currency !== undefined) {
        params.Currency = args.currency as string;
      }
      const result = await apiCall("/Account/Balance/Get", params);
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "account_price_list",
      description: "Get the price list for domain operations",
      inputSchema: {
        type: "object" as const,
        properties: {
          currency: {
            type: "string",
            description: "Currency for prices (e.g. USD, EUR, GBP)",
          },
          version: {
            type: "string",
            description: "Price list version",
          },
          discountCode: {
            type: "string",
            description: "Discount code to apply to the price list",
          },
        },
        required: [],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {};
      if (args.currency !== undefined) {
        params.Currency = args.currency as string;
      }
      if (args.version !== undefined) {
        params.Version = args.version as string;
      }
      if (args.discountCode !== undefined) {
        params.discountCode = args.discountCode as string;
      }
      const result = await apiCall("/Account/PriceList/Get", params);
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "account_configuration",
      description: "Get the current account configuration",
      inputSchema: {
        type: "object" as const,
        properties: {},
        required: [],
      },
    },
    handler: async (): Promise<string> => {
      const result = await apiCall("/Account/Configuration/Get");
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "account_domains_total_cost",
      description: "Get the total cost of all domains in the account",
      inputSchema: {
        type: "object" as const,
        properties: {},
        required: [],
      },
    },
    handler: async (): Promise<string> => {
      const result = await apiCall("/Account/DomainsTotalCost");
      return formatResponse(result);
    },
  },
];
