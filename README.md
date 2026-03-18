# Internet.bs MCP Server

A complete [Model Context Protocol](https://modelcontextprotocol.io) server for the [Internet.bs](https://internet.bs) domain registrar API.

**47 tools** covering the entire Internet.bs API:

- **Domains** — check, register, update, info, list, count, renew, restore, push, trade
- **Transfers** — initiate, retry, cancel, resend auth, history, approve/reject
- **DNS** — add, remove, update, list records
- **Nameservers** — create, info, update, delete, list hosts
- **URL Forwarding** — add, update, remove, list
- **Email Forwarding** — add, update, remove, list
- **Registrar Lock** — enable, disable, status
- **Private WHOIS** — enable, disable, status
- **Account** — balance, price list, configuration, total cost
- **Verification** — registrant email verification info & resend

---

## Option 1 — Remote (recommended)

Nothing to install. Just add this to your Claude Code MCP config:

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

Replace `your-api-key` and `your-password` with your [Internet.bs](https://internet.bs) API credentials. Done.

> Your credentials are sent directly to Internet.bs over HTTPS. They are never stored on the server.

**Test mode** (no account needed):

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

---

## Option 2 — Local (via npx)

Runs entirely on your machine. No external server involved.

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

**Test mode:**

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

---

## Try it

Once configured, ask Claude:

- *"Check if example.com is available"*
- *"List all my domains"*
- *"Add a DNS A record for www.mysite.com pointing to 1.2.3.4"*
- *"What's my account balance?"*
- *"Renew mysite.com for 2 years"*
- *"Set up email forwarding from info@mysite.com to me@gmail.com"*

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
| `url_forward_list` | List URL forwarding rules |

### Email Forwarding (4)

| Tool | Description |
|------|-------------|
| `email_forward_add` | Add an email forwarding rule |
| `email_forward_update` | Update an email forwarding rule |
| `email_forward_remove` | Remove an email forwarding rule |
| `email_forward_list` | List email forwarding rules |

### Registrar Lock (3)

| Tool | Description |
|------|-------------|
| `registrar_lock_enable` | Enable registrar lock (prevent unauthorized transfers) |
| `registrar_lock_disable` | Disable registrar lock |
| `registrar_lock_status` | Get registrar lock status |

### Private WHOIS (3)

| Tool | Description |
|------|-------------|
| `private_whois_enable` | Enable private WHOIS protection |
| `private_whois_disable` | Disable private WHOIS protection |
| `private_whois_status` | Get private WHOIS status |

### Account (4)

| Tool | Description |
|------|-------------|
| `account_balance` | Get account balance |
| `account_price_list` | Get domain pricing |
| `account_configuration` | Get account configuration |
| `account_domains_total_cost` | Get total cost of all domains |

### Registrant Verification (2)

| Tool | Description |
|------|-------------|
| `registrant_verification_info` | Get registrant email verification status |
| `registrant_verification_resend` | Resend registrant verification email |

## Self-hosting the remote server

Want to run your own instance instead of using ours? Deploy to Cloudflare Workers (free, 100K requests/day):

```bash
git clone https://github.com/uglyswap/internetbs-mcp.git
cd internetbs-mcp
npm install
npx wrangler login
npm run deploy
```

Your instance will be at `https://internetbs-mcp.<your-subdomain>.workers.dev/mcp`.

Users connect the same way as Option 1, just with your URL.

Optionally lock it down with a server-level token:

```bash
npx wrangler secret put MCP_AUTH_TOKEN
```

## Development

```bash
git clone https://github.com/uglyswap/internetbs-mcp.git
cd internetbs-mcp
npm install
npm run dev          # Local stdio (hot reload)
npm run dev:worker   # Local Cloudflare Worker (http://localhost:8787)
npm run build        # Compile TypeScript
npm start            # Run compiled stdio version
```

## License

MIT
