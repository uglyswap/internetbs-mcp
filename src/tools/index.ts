import { domainTools } from "./domain.js";
import { transferTools } from "./transfer.js";
import { dnsTools } from "./dns.js";
import { hostTools } from "./host.js";
import { forwardingTools } from "./forwarding.js";
import { lockTools } from "./lock.js";
import { whoisTools } from "./whois.js";
import { accountTools } from "./account.js";
import { verificationTools } from "./verification.js";
import type { ToolDefinition } from "../types.js";

export const allTools: ToolDefinition[] = [
  ...domainTools,
  ...transferTools,
  ...dnsTools,
  ...hostTools,
  ...forwardingTools,
  ...lockTools,
  ...whoisTools,
  ...accountTools,
  ...verificationTools,
];
