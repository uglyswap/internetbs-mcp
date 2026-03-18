import { apiCall, formatResponse } from "../client.js";
import type { ToolDefinition } from "../types.js";

const contactProperties = {
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
    description: "Registrant country code (e.g. US, FR, DE)",
  },
  registrant_postalcode: {
    type: "string",
    description: "Registrant postal code",
  },
  registrant_email: {
    type: "string",
    description: "Registrant email address",
  },
  registrant_phonenumber: {
    type: "string",
    description: "Registrant phone number (e.g. +1.5551234567)",
  },
  technical_firstname: {
    type: "string",
    description: "Technical contact first name",
  },
  technical_lastname: {
    type: "string",
    description: "Technical contact last name",
  },
  technical_email: {
    type: "string",
    description: "Technical contact email address",
  },
  admin_firstname: {
    type: "string",
    description: "Admin contact first name",
  },
  admin_lastname: {
    type: "string",
    description: "Admin contact last name",
  },
  admin_email: {
    type: "string",
    description: "Admin contact email address",
  },
  billing_firstname: {
    type: "string",
    description: "Billing contact first name",
  },
  billing_lastname: {
    type: "string",
    description: "Billing contact last name",
  },
  billing_email: {
    type: "string",
    description: "Billing contact email address",
  },
} as const;

function buildParams(args: Record<string, unknown>): Record<string, string> {
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(args)) {
    if (value !== undefined && value !== null && value !== "") {
      params[key] = String(value);
    }
  }
  return params;
}

export const domainTools: ToolDefinition[] = [
  // 1. domain_check
  {
    tool: {
      name: "domain_check",
      description:
        "Check domain name availability. Returns whether the domain is available for registration.",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description:
              "The domain name to check availability for (e.g. example.com)",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params = buildParams(args);
      const result = await apiCall("/Domain/Check", params);
      return formatResponse(result);
    },
  },

  // 2. domain_create
  {
    tool: {
      name: "domain_create",
      description:
        "Register a new domain name. Requires the domain name and optionally contact information, nameservers, and registration settings.",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description: "The domain name to register (e.g. example.com)",
          },
          period: {
            type: "string",
            description:
              "Registration period (e.g. 1Y for 1 year, 2Y for 2 years). Defaults to 1Y.",
          },
          ns_list: {
            type: "string",
            description:
              "Comma-separated list of nameservers (e.g. ns1.example.com,ns2.example.com)",
          },
          ...contactProperties,
          cloneContactsFromDomain: {
            type: "string",
            description:
              "Clone contact information from an existing domain in your account",
          },
          privateWhois: {
            type: "string",
            enum: ["FULL", "PARTIAL", "DISABLED"],
            description:
              "WHOIS privacy level. FULL hides all info, PARTIAL hides some, DISABLED shows all.",
          },
          registrarLock: {
            type: "string",
            enum: ["ENABLED", "DISABLED"],
            description:
              "Registrar lock status to prevent unauthorized transfers. Defaults to ENABLED.",
          },
          autoRenew: {
            type: "string",
            enum: ["YES", "NO"],
            description:
              "Enable or disable auto-renewal for this domain. Defaults to YES.",
          },
          discountCode: {
            type: "string",
            description: "Discount/promo code to apply to the registration",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params = buildParams(args);
      const result = await apiCall("/Domain/Create", params);
      return formatResponse(result);
    },
  },

  // 3. domain_update
  {
    tool: {
      name: "domain_update",
      description:
        "Update an existing domain's settings including nameservers, contacts, lock status, WHOIS privacy, and auto-renewal.",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description: "The domain name to update (e.g. example.com)",
          },
          ns_list: {
            type: "string",
            description:
              "Comma-separated list of nameservers (e.g. ns1.example.com,ns2.example.com)",
          },
          ...contactProperties,
          registrarLockStatus: {
            type: "string",
            enum: ["ENABLED", "DISABLED"],
            description: "Set registrar lock status to prevent unauthorized transfers",
          },
          privateWhoisStatus: {
            type: "string",
            enum: ["FULL", "PARTIAL", "DISABLED"],
            description: "Set WHOIS privacy level",
          },
          autoRenew: {
            type: "string",
            enum: ["YES", "NO"],
            description: "Enable or disable auto-renewal",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params = buildParams(args);
      const result = await apiCall("/Domain/Update", params);
      return formatResponse(result);
    },
  },

  // 4. domain_info
  {
    tool: {
      name: "domain_info",
      description:
        "Get detailed information about a domain including registration dates, nameservers, contacts, status, and WHOIS settings.",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description: "The domain name to get information for (e.g. example.com)",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params = buildParams(args);
      const result = await apiCall("/Domain/Info", params);
      return formatResponse(result);
    },
  },

  // 5. domain_registry_status
  {
    tool: {
      name: "domain_registry_status",
      description:
        "Get the registry status (EPP status codes) of a domain. Shows statuses like clientTransferProhibited, serverHold, etc.",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description: "The domain name to check registry status for",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params = buildParams(args);
      const result = await apiCall("/Domain/RegistryStatus", params);
      return formatResponse(result);
    },
  },

  // 6. domain_list
  {
    tool: {
      name: "domain_list",
      description:
        "List all domains in your Internet.bs account. Supports filtering, pagination, and sorting.",
      inputSchema: {
        type: "object",
        properties: {
          searchTermFilter: {
            type: "string",
            description:
              "Filter domains containing this search term (e.g. 'example' matches example.com, myexample.net)",
          },
          compactList: {
            type: "string",
            enum: ["YES", "NO"],
            description:
              "If YES, returns only domain names. If NO, returns full details. Defaults to NO.",
          },
          pendingOnly: {
            type: "string",
            enum: ["YES", "NO"],
            description:
              "If YES, returns only domains with pending operations. Defaults to NO.",
          },
          sortBy: {
            type: "string",
            description:
              "Field to sort results by (e.g. DomainName, ExpirationDate)",
          },
          rangeFrom: {
            type: "number",
            description:
              "Start index for pagination (1-based). Use with rangeTo for paginated results.",
          },
          rangeTo: {
            type: "number",
            description:
              "End index for pagination (1-based). Use with rangeFrom for paginated results.",
          },
          expirationFromDate: {
            type: "string",
            description:
              "Filter domains expiring on or after this date (format: YYYY/MM/DD)",
          },
          expirationToDate: {
            type: "string",
            description:
              "Filter domains expiring on or before this date (format: YYYY/MM/DD)",
          },
        },
        required: [],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params = buildParams(args);
      const result = await apiCall("/Domain/List", params);
      return formatResponse(result);
    },
  },

  // 7. domain_count
  {
    tool: {
      name: "domain_count",
      description:
        "Count the total number of domains in your Internet.bs account.",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    handler: async (): Promise<string> => {
      const result = await apiCall("/Domain/Count", {});
      return formatResponse(result);
    },
  },

  // 8. domain_renew
  {
    tool: {
      name: "domain_renew",
      description:
        "Renew an existing domain for an additional registration period.",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description: "The domain name to renew (e.g. example.com)",
          },
          period: {
            type: "string",
            description:
              "Renewal period (e.g. 1Y for 1 year, 2Y for 2 years). Defaults to 1Y.",
          },
          discountCode: {
            type: "string",
            description: "Discount/promo code to apply to the renewal",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params = buildParams(args);
      const result = await apiCall("/Domain/Renew", params);
      return formatResponse(result);
    },
  },

  // 9. domain_restore
  {
    tool: {
      name: "domain_restore",
      description:
        "Restore a deleted domain that is still within its redemption grace period. This typically incurs an additional fee.",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description:
              "The domain name to restore from redemption (e.g. example.com)",
          },
          discountCode: {
            type: "string",
            description: "Discount/promo code to apply to the restoration",
          },
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params = buildParams(args);
      const result = await apiCall("/Domain/Restore", params);
      return formatResponse(result);
    },
  },

  // 10. domain_push
  {
    tool: {
      name: "domain_push",
      description:
        "Push (transfer) a domain to another Internet.bs account. The recipient must have an Internet.bs account.",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description: "The domain name to push (e.g. example.com)",
          },
          destination: {
            type: "string",
            description:
              "Email address of the recipient's Internet.bs account",
          },
        },
        required: ["domain", "destination"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params = buildParams(args);
      const result = await apiCall("/Domain/Push", params);
      return formatResponse(result);
    },
  },

  // 11. domain_trade
  {
    tool: {
      name: "domain_trade",
      description:
        "Trade a .eu or .fr domain (change of registrant). This is required for certain TLDs when the registrant changes, as a simple update is not allowed.",
      inputSchema: {
        type: "object",
        properties: {
          domain: {
            type: "string",
            description:
              "The domain name to trade (must be .eu or .fr TLD)",
          },
          ns_list: {
            type: "string",
            description:
              "Comma-separated list of nameservers (e.g. ns1.example.com,ns2.example.com)",
          },
          ...contactProperties,
        },
        required: ["domain"],
      },
    },
    handler: async (args: Record<string, unknown>): Promise<string> => {
      const params = buildParams(args);
      const result = await apiCall("/Domain/Trade", params);
      return formatResponse(result);
    },
  },
];
