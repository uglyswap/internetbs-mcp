import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export interface ToolDefinition {
  tool: Tool;
  handler: (args: Record<string, unknown>) => Promise<string>;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  organization?: string;
  street: string;
  street2?: string;
  street3?: string;
  city: string;
  countryCode: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
  faxNumber?: string;
  obfuscateEmail?: string;
}
