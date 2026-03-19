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
2. **API credentials** — Go to your account settings and request API access. You'll receive an **API Key** and a **Password**
3. **An MCP-compatible client** (see [Compatibility](#compatibility))

> **No account yet?** You can try everything with the free sandbox — see [Test Mode](#test-mode) below.

---

## Important: IP Whitelisting

Internet.bs **requires you to whitelist an IP address** when creating an API key. Only requests coming from that IP will be accepted. This has important implications depending on how you run this MCP server:

### How to find your IP address

Run one of these commands in your terminal:

```bash
curl -s ifconfig.me        # Linux / Mac / WSL
curl -s api.ipify.org      # Alternative (IPv4 only)
```

Or visit [whatismyip.com](https://whatismyip.com) in your browser.

> **Important:** Use your **IPv4** address, not IPv6. If `ifconfig.me` returns an IPv6 (e.g. `2a02:...`), use `curl -s api.ipify.org` instead to get your IPv4.

### Local mode (npx) — recommended

You run the server on your own machine. **Whitelist your residential/office IP** (the public IPv4 of the machine running Claude Code).

> If your ISP changes your IP (common with residential connections), you'll need to update the whitelisted IP in your Internet.bs account, or create a new API key.

### Self-hosted remote mode (your own server)

You run the server on a VPS/dedicated server. **Whitelist the server's fixed IP**.

To find the server's outbound IP:

```bash
curl -s api.ipify.org    # Run this on the server
```

This works well with servers that have a **static IP** (OVH, Hetzner, Contabo, etc.). It does **NOT** work with serverless platforms like Cloudflare Workers, Vercel, or AWS Lambda, because they use shared/rotating IPs that can't be whitelisted.

### Multiple environments

If you need to use the API from multiple IPs (e.g., your PC + a server), you have two options:

1. **Create multiple API keys** — one per IP, each whitelisted for its own IP
2. **Update the whitelisted IP** — in your Internet.bs account when you switch environments

---

## Option 1 — Local (via npx) — Recommended

Runs entirely on your machine. Nothing to install besides Node.js.

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

Replace `your-api-key` and `your-password` with your credentials. Requires [Node.js](https://nodejs.org) >= 18.

---

## Option 2 — Self-hosted remote (your own server)

Deploy on any server with a **fixed IP address**. Users connect via URL and pass their own credentials in headers. The server is a stateless proxy — it never stores credentials.

```json
{
  "mcpServers": {
    "internetbs": {
      "url": "https://your-server.com/mcp",
      "headers": {
        "X-InternetBS-Key": "your-api-key",
        "X-InternetBS-Password": "your-password"
      }
    }
  }
}
```

See [Self-Hosting](#self-hosting) for deployment instructions.

> **Warning:** Serverless platforms (Cloudflare Workers free tier, Vercel, AWS Lambda) do NOT have fixed IPs. They are incompatible with Internet.bs IP whitelisting. Use a VPS with a static IP instead.

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
        "internetbs-mcp"
      ]
    }
  }
}
```

Build the image:

```bash
git clone https://github.com/uglyswap/internetbs-mcp.git
cd internetbs-mcp
docker build -t internetbs-mcp .
```

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

### Local mode (environment variables)

| Variable | Required | Description |
|----------|----------|-------------|
| `INTERNETBS_API_KEY` | Yes | Your Internet.bs API key |
| `INTERNETBS_PASSWORD` | Yes | Your Internet.bs API password |
| `INTERNETBS_API_URL` | No | API base URL. Default: `https://testapi.internet.bs`. Set to `https://api.internet.bs` for production |

### Remote mode (headers)

| Header | Required | Description |
|--------|----------|-------------|
| `X-InternetBS-Key` | Yes | Your Internet.bs API key |
| `X-InternetBS-Password` | Yes | Your Internet.bs API password |
| `X-InternetBS-URL` | No | API base URL. Default: `https://api.internet.bs`. Use `https://testapi.internet.bs` for sandbox |

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

- **Local mode** — Credentials never leave your machine. API calls go directly from your computer to Internet.bs over HTTPS.
- **Remote mode** — Credentials are passed via HTTPS headers on each request and forwarded to Internet.bs. The server does not log or persist them.
- **IP whitelisting** — Internet.bs requires your IP to be whitelisted, adding an extra layer of security.
- **No database** — The server is stateless. No user data, no sessions, no logs.
- **Open source** — Full code in this repository. Audit it yourself.

> **Important:** Your Internet.bs API credentials can register and manage domains, which involves real money. Keep your API key and password secure. Never share them publicly.

---

## Compatibility

| Client | Local (npx) | Remote (URL) | Docker |
|--------|:-----------:|:------------:|:------:|
| Claude Code | Yes | Yes | Yes |
| Claude Desktop | Yes | Yes | Yes |
| Cursor | Yes | Yes | Yes |
| Windsurf | Yes | Yes | Yes |
| Zed | Yes | — | Yes |
| Any MCP client | Yes | Yes | Yes |

---

## Self-Hosting

Deploy on any server with a **static IP** (VPS, dedicated server, etc.).

### With Docker

```bash
git clone https://github.com/uglyswap/internetbs-mcp.git
cd internetbs-mcp
docker build -t internetbs-mcp .
docker run -d --name internetbs-mcp -p 3000:3000 internetbs-mcp
```

### With Node.js

```bash
git clone https://github.com/uglyswap/internetbs-mcp.git
cd internetbs-mcp
npm install
npm run build
npm start
```

### As a Cloudflare Worker (advanced)

The repo includes a `wrangler.toml` and `src/worker.ts` for Cloudflare Workers deployment. However, **Cloudflare Workers free tier uses shared/rotating IPs** which are incompatible with Internet.bs IP whitelisting. This only works if:

- You have Cloudflare Enterprise with dedicated egress IPs, or
- You use the worker as a proxy behind a fixed-IP server

```bash
npx wrangler login
npm run deploy
```

### Whitelisting your server's IP

1. Log into your Internet.bs account
2. Go to API settings
3. Create an API key whitelisted for your **server's public IP**
4. Use that API key in your deployment

> If your server has multiple outbound IPs, whitelist the one used for HTTPS requests. Run `curl ifconfig.me` on the server to check.

---

## Troubleshooting

### "Missing credentials" error
Make sure your headers (remote) or env vars (local) are set correctly. The API key and password are both required.

### "FAILURE" status in API responses
Usually means invalid credentials, IP not whitelisted, or the operation isn't supported. Check your Internet.bs account.

### IP not authorized
Internet.bs requires IP whitelisting. Go to your account settings and add your machine's public IP. Run `curl ifconfig.me` to check your IP.

### npx is slow on first run
`npx` downloads the package on first use (~25KB). Subsequent runs use the cache.

### Connection timeout
The Internet.bs API can occasionally be slow. The default timeout is 25 seconds. If you experience timeouts, try again.

### "Unknown tool" error
Run `npx internetbs-mcp@latest` to force update to the latest version.

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
  worker.ts          # HTTP entry point (remote/self-hosted mode)
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
