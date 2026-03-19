[![npm version](https://img.shields.io/npm/v/internetbs-mcp.svg)](https://www.npmjs.com/package/internetbs-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)
[![MCP](https://img.shields.io/badge/MCP-compatible-purple.svg)](https://modelcontextprotocol.io)

# Internet.bs MCP Server

A complete [Model Context Protocol](https://modelcontextprotocol.io) server for the [Internet.bs](https://internet.bs) domain registrar API.

**47 tools** covering 100% of the Internet.bs API:

| Category | Tools | What you can do |
|----------|-------|-----------------|
| **Domains** | 11 | Check availability, register, update, info, list, count, renew, restore, push, trade |
| **Transfers** | 7 | Initiate, retry, cancel, resend auth, history, approve/reject outgoing |
| **DNS Records** | 4 | Add, remove, update, list (A, AAAA, CNAME, MX, TXT, SRV, NS) |
| **Nameservers** | 5 | Create, info, update, delete, list glue records |
| **URL Forwarding** | 4 | Add, update, remove, list redirects |
| **Email Forwarding** | 4 | Add, update, remove, list email routes |
| **Registrar Lock** | 3 | Enable, disable, check status |
| **Private WHOIS** | 3 | Enable, disable, check status |
| **Account** | 4 | Balance, price list, configuration, total cost |
| **Verification** | 2 | Registrant email verification info & resend |

---

## Setup (2 minutes)

### 1. Get your Internet.bs API credentials

1. Sign up at [internet.bs](https://internet.bs)
2. Go to your account settings and request API access
3. You'll receive an **API Key** and a **Password**
4. Whitelist your IP address (the IP of the machine running the MCP server)

### 2. Add to your MCP client

Add this to your MCP configuration:

```json
{
  "mcpServers": {
    "internetbs": {
      "command": "npx",
      "args": ["-y", "internetbs-mcp"],
      "env": {
        "INTERNETBS_API_KEY": "your-api-key",
        "INTERNETBS_PASSWORD": "your-password",
        "INTERNETBS_API_URL": "https://api.internet.bs"
      }
    }
  }
}
```

Replace `your-api-key` and `your-password` with your credentials. That's it.

> **Note:** Internet.bs requires IP whitelisting. Make sure the IP of the machine running this MCP server is authorized in your Internet.bs account.

### 3. Try it

Ask Claude:

- *"Is example.com available?"*
- *"List all my domains"*
- *"Add a DNS A record for www.mysite.com pointing to 1.2.3.4"*

---

## Where to put the config

| Client | Config file location |
|--------|---------------------|
| **Claude Code** | `~/.claude.json` → `projects.<path>.mcpServers` |
| **Claude Desktop** | `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows) |
| **Cursor** | Settings > MCP Servers |
| **Windsurf** | `~/.codeium/windsurf/mcp_config.json` |

---

## Test Mode

Internet.bs provides a free sandbox — no account needed, no IP whitelisting:

```json
{
  "mcpServers": {
    "internetbs": {
      "command": "npx",
      "args": ["-y", "internetbs-mcp"],
      "env": {
        "INTERNETBS_API_KEY": "testapi",
        "INTERNETBS_PASSWORD": "testpass",
        "INTERNETBS_API_URL": "https://testapi.internet.bs"
      }
    }
  }
}
```

> The sandbox has limited data. Some operations will return test data only.

---

## Usage Examples

| What you want to do | Example prompt |
|---------------------|----------------|
| Check availability | *"Is example.com available?"* |
| Register a domain | *"Register mysite.com with my contact info"* |
| List domains | *"List all my domains"* |
| Domain info | *"Show me the details for mysite.com"* |
| DNS management | *"Add an A record for www.mysite.com pointing to 93.184.216.34"* |
| Email forwarding | *"Forward info@mysite.com to me@gmail.com"* |
| URL forwarding | *"Redirect blog.mysite.com to mysite.com/blog"* |
| Renew | *"Renew mysite.com for 2 years"* |
| Transfer | *"Transfer example.org to my account, auth code is ABC123"* |
| Account | *"What's my account balance?"* |
| Lock | *"Enable registrar lock on mysite.com"* |
| WHOIS privacy | *"Enable private WHOIS on all my domains"* |

---

## Configuration Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `INTERNETBS_API_KEY` | Yes | Your Internet.bs API key |
| `INTERNETBS_PASSWORD` | Yes | Your Internet.bs API password |
| `INTERNETBS_API_URL` | No | API base URL. Default: `https://testapi.internet.bs`. Set to `https://api.internet.bs` for production |

---

## All 47 Tools

### Domain Operations (11)

| Tool | Description |
|------|-------------|
| `domain_check` | Check if a domain is available for registration |
| `domain_create` | Register a new domain name |
| `domain_update` | Update domain contacts, nameservers, settings |
| `domain_info` | Get detailed domain information |
| `domain_registry_status` | Get domain registry status |
| `domain_list` | List all domains in the account |
| `domain_count` | Count domains by extension |
| `domain_renew` | Renew a domain registration |
| `domain_restore` | Restore a deleted domain in redemption period |
| `domain_push` | Push a domain to another Internet.bs account |
| `domain_trade` | Trade .eu/.fr domains (change registrant) |

### Transfer Operations (7)

| Tool | Description |
|------|-------------|
| `transfer_initiate` | Initiate a domain transfer to your account |
| `transfer_retry` | Retry a failed domain transfer |
| `transfer_cancel` | Cancel a pending domain transfer |
| `transfer_resend_auth_email` | Resend transfer authorization email |
| `transfer_history` | Get transfer history for a domain |
| `transfer_away_approve` | Approve an outgoing domain transfer |
| `transfer_away_reject` | Reject an outgoing domain transfer |

### DNS Records (4)

| Tool | Description |
|------|-------------|
| `dns_record_add` | Add a DNS record (A, AAAA, CNAME, MX, TXT, SRV, NS) |
| `dns_record_remove` | Remove a DNS record |
| `dns_record_update` | Update an existing DNS record |
| `dns_record_list` | List all DNS records for a domain |

### Nameserver Hosts (5)

| Tool | Description |
|------|-------------|
| `host_create` | Create a nameserver host (glue record) |
| `host_info` | Get host information and IPs |
| `host_update` | Update host IP addresses |
| `host_delete` | Delete a nameserver host |
| `host_list` | List all hosts for a domain |

### URL Forwarding (4)

| Tool | Description |
|------|-------------|
| `url_forward_add` | Add a URL forwarding rule |
| `url_forward_update` | Update a URL forwarding rule |
| `url_forward_remove` | Remove a URL forwarding rule |
| `url_forward_list` | List URL forwarding rules for a domain |

### Email Forwarding (4)

| Tool | Description |
|------|-------------|
| `email_forward_add` | Add an email forwarding rule |
| `email_forward_update` | Update an email forwarding rule |
| `email_forward_remove` | Remove an email forwarding rule |
| `email_forward_list` | List email forwarding rules for a domain |

### Registrar Lock (3)

| Tool | Description |
|------|-------------|
| `registrar_lock_enable` | Enable registrar lock (prevent unauthorized transfers) |
| `registrar_lock_disable` | Disable registrar lock |
| `registrar_lock_status` | Get current registrar lock status |

### Private WHOIS (3)

| Tool | Description |
|------|-------------|
| `private_whois_enable` | Enable private WHOIS protection (FULL or PARTIAL) |
| `private_whois_disable` | Disable private WHOIS protection |
| `private_whois_status` | Get current private WHOIS status |

### Account (4)

| Tool | Description |
|------|-------------|
| `account_balance` | Get account balance (supports multiple currencies) |
| `account_price_list` | Get pricing for all domain extensions |
| `account_configuration` | Get account configuration and settings |
| `account_domains_total_cost` | Get total annual cost of all domains |

### Registrant Verification (2)

| Tool | Description |
|------|-------------|
| `registrant_verification_info` | Get registrant email verification status |
| `registrant_verification_resend` | Resend registrant verification email |

---

## Security

- **Runs locally** — Your credentials never leave your machine. All API calls go directly from your computer to Internet.bs over HTTPS.
- **No external server** — No proxy, no middleman.
- **IP whitelisting** — Internet.bs requires your IP to be whitelisted, adding an extra layer of security.
- **Open source** — Full code in this repository. Audit it yourself.

---

## Compatibility

Works with any MCP-compatible client:

| Client | Supported |
|--------|:---------:|
| Claude Code | Yes |
| Claude Desktop | Yes |
| Cursor | Yes |
| Windsurf | Yes |
| Zed | Yes |
| Any MCP client | Yes |

---

## Troubleshooting

### "Missing credentials" error
Make sure `INTERNETBS_API_KEY` and `INTERNETBS_PASSWORD` are set in your MCP config `env` block.

### "FAILURE" status in API responses
Usually means invalid credentials, IP not whitelisted, or the operation isn't supported. Check your Internet.bs account.

### npx is slow on first run
`npx` downloads the package on first use (~25KB). Subsequent runs use the cache and start instantly.

### IP not authorized
Internet.bs requires IP whitelisting. Go to your Internet.bs account settings and add your machine's public IP.

### "Unknown tool" error
Run `npx internetbs-mcp@latest` to force update to the latest version.

---

## Development

```bash
git clone https://github.com/uglyswap/internetbs-mcp.git
cd internetbs-mcp
npm install
npm run dev      # Local stdio server (hot reload)
npm run build    # Compile TypeScript
npm start        # Run compiled version
```

### Project structure

```
src/
  index.ts           # MCP server entry point (stdio transport)
  client.ts          # Internet.bs API HTTP client
  types.ts           # TypeScript type definitions
  tools/
    domain.ts        # Domain management (11 tools)
    transfer.ts      # Domain transfers (7 tools)
    dns.ts           # DNS records (4 tools)
    host.ts          # Nameserver hosts (5 tools)
    forwarding.ts    # URL & email forwarding (8 tools)
    lock.ts          # Registrar lock (3 tools)
    whois.ts         # Private WHOIS (3 tools)
    account.ts       # Account operations (4 tools)
    verification.ts  # Registrant verification (2 tools)
    index.ts         # Aggregates all tools
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push and open a Pull Request

For bugs, [open an issue](https://github.com/uglyswap/internetbs-mcp/issues).

---

## Links

- [Internet.bs](https://internet.bs) — Domain registrar
- [Internet.bs API Documentation](https://internet.bs/api/) — Official API docs
- [Model Context Protocol](https://modelcontextprotocol.io) — MCP specification

## License

MIT — see [LICENSE](LICENSE)
