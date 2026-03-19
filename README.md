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

## Prerequisites

1. **An Internet.bs account** — Sign up at [internet.bs](https://internet.bs)
2. **API credentials** — Once logged in, go to your account settings and request API access. You'll receive an **API Key** and a **Password**
3. **An MCP-compatible client** (see [Compatibility](#compatibility))

> **No account yet?** You can try everything with the free sandbox credentials — see [Test Mode](#test-mode) below.

---

## Option 1 — Remote (nothing to install)

Add this to your MCP client configuration:

```json
{
  "mcpServers": {
    "internetbs": {
      "url": "https://internetbs-mcp.uglyswap.workers.dev/mcp",
      "headers": {
        "X-InternetBS-Key": "your-api-key",
        "X-InternetBS-Password": "your-password"
      }
    }
  }
}
```

Replace `your-api-key` and `your-password` with your Internet.bs credentials. That's it.

**How it works:** The server runs on Cloudflare Workers. Your credentials are forwarded to Internet.bs over HTTPS on each request. Nothing is stored or logged on the server.

---

## Option 2 — Local (via npx)

Runs entirely on your machine:

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

Requires [Node.js](https://nodejs.org) >= 18 installed.

---

## Option 3 — Docker

```json
{
  "mcpServers": {
    "internetbs": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "INTERNETBS_API_KEY=your-api-key",
        "-e", "INTERNETBS_PASSWORD=your-password",
        "-e", "INTERNETBS_API_URL=https://api.internet.bs",
        "ghcr.io/uglyswap/internetbs-mcp"
      ]
    }
  }
}
```

Or build locally:

```bash
git clone https://github.com/uglyswap/internetbs-mcp.git
cd internetbs-mcp
docker build -t internetbs-mcp .
```

---

## Where to put the config

| Client | Config file location |
|--------|---------------------|
| **Claude Code** | `~/.claude/settings.json` |
| **Claude Desktop** | `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows) |
| **Cursor** | Settings > MCP Servers |
| **Windsurf** | `~/.codeium/windsurf/mcp_config.json` |
| **Any MCP client** | Check your client's documentation for MCP server configuration |

---

## Test Mode

Internet.bs provides a free sandbox — no account needed:

**Remote:**
```json
{
  "mcpServers": {
    "internetbs": {
      "url": "https://internetbs-mcp.uglyswap.workers.dev/mcp",
      "headers": {
        "X-InternetBS-Key": "testapi",
        "X-InternetBS-Password": "testpass",
        "X-InternetBS-URL": "https://testapi.internet.bs"
      }
    }
  }
}
```

**Local:**
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

> Note: The sandbox has limited data. Some operations (like listing domains) will return test data only.

---

## Usage Examples

Once configured, just ask in natural language:

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

### Remote mode (headers)

| Header | Required | Description |
|--------|----------|-------------|
| `X-InternetBS-Key` | Yes | Your Internet.bs API key |
| `X-InternetBS-Password` | Yes | Your Internet.bs API password |
| `X-InternetBS-URL` | No | API base URL. Default: `https://api.internet.bs`. Use `https://testapi.internet.bs` for sandbox |

### Local mode (environment variables)

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

- **Credentials are never stored** — In remote mode, your API key and password are passed via HTTPS headers on each request and forwarded directly to Internet.bs. The server does not log or persist them.
- **HTTPS only** — All communication with Internet.bs uses HTTPS. The Cloudflare Worker endpoint is also HTTPS-only.
- **No database** — The server is stateless. No user data, no sessions, no logs.
- **Open source** — The full server code is in this repository. Audit it yourself.
- **Self-host option** — If you don't want to use the shared instance, deploy your own (see below).

> **Important:** Your Internet.bs API credentials can register and manage domains, which involves real money. Keep your API key and password secure. Never share them publicly.

---

## Compatibility

This server implements the [Model Context Protocol](https://modelcontextprotocol.io) and works with any MCP-compatible client:

| Client | Remote (URL) | Local (npx) | Status |
|--------|:---:|:---:|--------|
| Claude Code | Yes | Yes | Fully supported |
| Claude Desktop | Yes | Yes | Fully supported |
| Cursor | Yes | Yes | Fully supported |
| Windsurf | Yes | Yes | Fully supported |
| Zed | — | Yes | Local mode only |
| Any MCP client | Yes | Yes | Standard MCP protocol |

---

## Self-Hosting

Deploy your own instance on Cloudflare Workers (free tier: 100K requests/day):

```bash
git clone https://github.com/uglyswap/internetbs-mcp.git
cd internetbs-mcp
npm install
npx wrangler login
npm run deploy
```

Your instance: `https://internetbs-mcp.<your-subdomain>.workers.dev/mcp`

Users connect the same way as Option 1, just with your URL.

**Optional:** Lock down access with a server-level token:

```bash
npx wrangler secret put MCP_AUTH_TOKEN
```

Users must then include `"Authorization": "Bearer <token>"` in their headers.

---

## Troubleshooting

### "Missing credentials" error
Make sure your headers (remote) or env vars (local) are set correctly. The API key and password are both required.

### "FAILURE" status in API responses
This usually means invalid credentials or the domain/operation isn't supported. Check your Internet.bs account status and API access.

### npx is slow on first run
`npx` downloads the package on first use (~20KB). Subsequent runs use the cache and start instantly.

### Connection timeout
The Internet.bs API can occasionally be slow. The default timeout is 25 seconds. If you experience timeouts, try again.

### "Unknown tool" error
Make sure you're using the latest version. Run `npx internetbs-mcp@latest` to force an update.

---

## Development

```bash
git clone https://github.com/uglyswap/internetbs-mcp.git
cd internetbs-mcp
npm install
npm run dev          # Local stdio server (hot reload)
npm run dev:worker   # Local Cloudflare Worker (http://localhost:8787)
npm run build        # Compile TypeScript
npm start            # Run compiled stdio version
```

### Project structure

```
src/
  index.ts           # stdio entry point (local mode)
  worker.ts          # Cloudflare Worker entry point (remote mode)
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

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push and open a Pull Request

For bugs, please [open an issue](https://github.com/uglyswap/internetbs-mcp/issues).

---

## Links

- [Internet.bs](https://internet.bs) — Domain registrar
- [Internet.bs API Documentation](https://internet.bs/api/) — Official API docs
- [Model Context Protocol](https://modelcontextprotocol.io) — MCP specification
- [MCP Server Registry](https://github.com/modelcontextprotocol/servers) — Other MCP servers

## License

MIT — see [LICENSE](LICENSE)
