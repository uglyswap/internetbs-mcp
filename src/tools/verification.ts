import { apiCall, formatResponse } from "../client.js";
import type { ToolDefinition } from "../types.js";

export const verificationTools: ToolDefinition[] = [
  {
    tool: {
      name: "registrant_verification_info",
      description: "Get registrant email verification info for a domain",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to get verification info for",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: args.domain as string,
      };
      const result = await apiCall(
        "/Domain/RegistrantVerification/Info",
        params
      );
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "registrant_verification_resend",
      description: "Resend the registrant verification email for a domain",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to resend verification email for",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: args.domain as string,
      };
      const result = await apiCall(
        "/Domain/RegistrantVerification/Resend",
        params
      );
      return formatResponse(result);
    },
  },
];
