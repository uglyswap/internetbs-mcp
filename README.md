# Internet.bs MCP Server

A complete [Model Context Protocol](https://modelcontextprotocol.io) server for the [Internet.bs](https://internet.bs) domain registrar API.

**47 tools** covering the entire Internet.bs API surface:

- **Domain Management** — check availability, register, update, info, list, count, renew, restore, push, trade
- **Domain Transfers** — initiate, retry, cancel, resend auth email, history, approve/reject outgoing
- **DNS Records** — add, remove, update, list
- **Nameserver Hosts** — create, info, update, delete, list
- **URL Forwarding** — add, update, remove, list
- **Email Forwarding** — add, update, remove, list
- **Registrar Lock** — enable, disable, status
- **Private WHOIS** — enable, disable, status
- **Account** — balance, price list, configuration, total cost
- **Registrant Verification** — info, resend

## Quick Start

### Prerequisites

- Node.js >= 18
- Internet.bs API credentials ([request access](https://internet.bs))

### Installation

```bash
git clone https://github.com/uglyswap/internetbs-mcp.git
cd internetbs-mcp
npm install
npm run build
```

### Configuration

Set environment variables:

```bash
export INTERNETBS_API_KEY="your-api-key"
export INTERNETBS_PASSWORD="your-password"
export INTERNETBS_API_URL="https://api.internet.bs"  # or https://testapi.internet.bs for testing
```

Or copy `.env.example` to `.env` and fill in your credentials.

### Usage with Claude Code

Add to your Claude Code MCP settings (`~/.claude/settings.json`):

```json
{
  "mcpServers": {
    "internetbs": {
      "command": "node",
      "args": ["/path/to/internetbs-mcp/dist/index.js"],
      "env": {
        "INTERNETBS_API_KEY": "your-api-key",
        "INTERNETBS_PASSWORD": "your-password",
        "INTERNETBS_API_URL": "https://api.internet.bs"
      }
    }
  }
}
```

### Usage with Docker

```bash
docker build -t internetbs-mcp .
docker run -i --rm \
  -e INTERNETBS_API_KEY="your-key" \
  -e INTERNETBS_PASSWORD="your-pass" \
  -e INTERNETBS_API_URL="https://api.internet.bs" \
  internetbs-mcp
```

### Deploy on Cloudflare Workers (recommended, free)

100K requests/day free. Zero infrastructure to manage.

**1. Install dependencies and login:**

```bash
npm install
npx wrangler login
```

**2. Set your secrets:**

```bash
npx wrangler secret put INTERNETBS_API_KEY
npx wrangler secret put INTERNETBS_PASSWORD
npx wrangler secret put MCP_AUTH_TOKEN
```

**3. Deploy:**

```bash
npm run deploy
```

Your MCP server will be live at `https://internetbs-mcp.<your-subdomain>.workers.dev/mcp`

**4. Connect from Claude Code:**

```json
{
  "mcpServers": {
    "internetbs": {
      "url": "https://internetbs-mcp.<your-subdomain>.workers.dev/mcp",
      "headers": {
        "Authorization": "Bearer your-mcp-auth-token"
      }
    }
  }
}
```

Health check: `GET https://internetbs-mcp.<your-subdomain>.workers.dev/health`

### Testing with Internet.bs Sandbox

Internet.bs provides a free test environment:

```bash
export INTERNETBS_API_KEY="testapi"
export INTERNETBS_PASSWORD="testpass"
export INTERNETBS_API_URL="https://testapi.internet.bs"
```

## Available Tools

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

## Development

```bash
npm install
npm run dev      # Run with tsx (hot reload)
npm run build    # Compile TypeScript
npm start        # Run compiled version
```

## License

MIT
