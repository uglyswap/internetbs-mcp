import { apiCall, formatResponse } from "../client.js";
import type { ToolDefinition } from "../types.js";

export const transferTools: ToolDefinition[] = [
  {
    tool: {
      name: "transfer_initiate",
      description:
        "Initiate a domain transfer to your Internet.bs account. Requires the domain name and optionally the EPP auth code, registration period, registrant contact info, nameservers, and other transfer options.",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to transfer (e.g. example.com)",
          },
          transferAuthInfo: {
            type: "string",
            description: "The EPP authorization/transfer code from the current registrar",
          },
          period: {
            type: "string",
            description: "Registration period (e.g. '1Y' for 1 year)",
          },
          registrant_firstname: {
            type: "string",
            description: "Registrant first name",
          },
          registrant_lastname: {
            type: "string",
            description: "Registrant last name",
          },
          registrant_organization: {
            type: "string",
            description: "Registrant organization",
          },
          registrant_street: {
            type: "string",
            description: "Registrant street address",
          },
          registrant_city: {
            type: "string",
            description: "Registrant city",
          },
          registrant_countrycode: {
            type: "string",
            description: "Registrant country code (e.g. US, FR)",
          },
          registrant_postalcode: {
            type: "string",
            description: "Registrant postal/zip code",
          },
          registrant_email: {
            type: "string",
            description: "Registrant email address",
          },
          registrant_phonenumber: {
            type: "string",
            description: "Registrant phone number (e.g. +1.5551234567)",
          },
          ns_list: {
            type: "string",
            description: "Comma-separated list of nameservers (e.g. 'ns1.example.com,ns2.example.com')",
          },
          cloneContactsFromDomain: {
            type: "string",
            description: "Clone contact information from an existing domain in your account",
          },
          privateWhois: {
            type: "string",
            enum: ["FULL", "PARTIAL", "DISABLED"],
            description: "Private WHOIS setting: FULL, PARTIAL, or DISABLED",
          },
          registrarLock: {
            type: "string",
            enum: ["ENABLED", "DISABLED"],
            description: "Registrar lock setting: ENABLED or DISABLED",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: String(args.domain),
      };

      if (args.transferAuthInfo !== undefined) {
        params.transferAuthInfo = String(args.transferAuthInfo);
      }
      if (args.period !== undefined) {
        params.Period = String(args.period);
      }
      if (args.registrant_firstname !== undefined) {
        params["Registrant_FirstName"] = String(args.registrant_firstname);
      }
      if (args.registrant_lastname !== undefined) {
        params["Registrant_LastName"] = String(args.registrant_lastname);
      }
      if (args.registrant_organization !== undefined) {
        params["Registrant_Organization"] = String(args.registrant_organization);
      }
      if (args.registrant_street !== undefined) {
        params["Registrant_Street"] = String(args.registrant_street);
      }
      if (args.registrant_city !== undefined) {
        params["Registrant_City"] = String(args.registrant_city);
      }
      if (args.registrant_countrycode !== undefined) {
        params["Registrant_CountryCode"] = String(args.registrant_countrycode);
      }
      if (args.registrant_postalcode !== undefined) {
        params["Registrant_PostalCode"] = String(args.registrant_postalcode);
      }
      if (args.registrant_email !== undefined) {
        params["Registrant_Email"] = String(args.registrant_email);
      }
      if (args.registrant_phonenumber !== undefined) {
        params["Registrant_PhoneNumber"] = String(args.registrant_phonenumber);
      }
      if (args.ns_list !== undefined) {
        params.Ns_list = String(args.ns_list);
      }
      if (args.cloneContactsFromDomain !== undefined) {
        params.CloneContactsFromDomain = String(args.cloneContactsFromDomain);
      }
      if (args.privateWhois !== undefined) {
        params.privateWhois = String(args.privateWhois);
      }
      if (args.registrarLock !== undefined) {
        params.registrarLock = String(args.registrarLock);
      }

      const result = await apiCall("/Domain/Transfer/Initiate", params);
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "transfer_retry",
      description:
        "Retry a previously failed domain transfer. Optionally provide an updated EPP auth code.",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to retry the transfer for",
          },
          transferAuthInfo: {
            type: "string",
            description: "The EPP authorization/transfer code (if it was incorrect previously)",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: String(args.domain),
      };

      if (args.transferAuthInfo !== undefined) {
        params.transferAuthInfo = String(args.transferAuthInfo);
      }

      const result = await apiCall("/Domain/Transfer/Retry", params);
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "transfer_cancel",
      description: "Cancel a pending domain transfer.",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to cancel the transfer for",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: String(args.domain),
      };

      const result = await apiCall("/Domain/Transfer/Cancel", params);
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "transfer_resend_auth_email",
      description:
        "Resend the transfer authorization email for a pending domain transfer.",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to resend the authorization email for",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: String(args.domain),
      };

      const result = await apiCall("/Domain/Transfer/ResendAuthEmail", params);
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "transfer_history",
      description: "Get the transfer history for a domain.",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to retrieve transfer history for",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: String(args.domain),
      };

      const result = await apiCall("/Domain/Transfer/History", params);
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "transfer_away_approve",
      description:
        "Approve an outgoing domain transfer (transfer away from your account to another registrar).",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to approve the outgoing transfer for",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: String(args.domain),
      };

      const result = await apiCall("/Domain/TransferAway/Approve", params);
      return formatResponse(result);
    },
  },
  {
    tool: {
      name: "transfer_away_reject",
      description:
        "Reject an outgoing domain transfer (transfer away from your account to another registrar). A reason must be provided (10-512 characters).",
      inputSchema: {
        type: "object" as const,
        properties: {
          domain: {
            type: "string",
            description: "The domain name to reject the outgoing transfer for",
          },
          reason: {
            type: "string",
            description: "Reason for rejecting the transfer (minimum 10 characters, maximum 512 characters)",
            minLength: 10,
            maxLength: 512,
          },
        },
        required: ["domain", "reason"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params: Record<string, string> = {
        Domain: String(args.domain),
        Reason: String(args.reason),
      };

      const result = await apiCall("/Domain/TransferAway/Reject", params);
      return formatResponse(result);
    },
  },
];
