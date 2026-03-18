import https from "node:https";
import { URL, URLSearchParams } from "node:url";

export interface ApiResponse {
  status?: string;
  transactid?: string;
  [key: string]: unknown;
}

export interface ClientConfig {
  apiKey: string;
  password: string;
  apiUrl: string;
}

function getConfig(): ClientConfig {
  const apiKey = process.env.INTERNETBS_API_KEY;
  const password = process.env.INTERNETBS_PASSWORD;
  const apiUrl =
    process.env.INTERNETBS_API_URL || "https://testapi.internet.bs";

  if (!apiKey || !password) {
    throw new Error(
      "Missing INTERNETBS_API_KEY or INTERNETBS_PASSWORD environment variables"
    );
  }

  return { apiKey, password, apiUrl };
}

function httpsRequest(
  url: string,
  method: string,
  body?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        ...(body ? { "Content-Length": Buffer.byteLength(body) } : {}),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk: Buffer) => {
        data += chunk.toString();
      });
      res.on("end", () => resolve(data));
    });

    req.on("error", reject);
    req.setTimeout(30000, () => {
      req.destroy(new Error("Request timeout after 30s"));
    });

    if (body) req.write(body);
    req.end();
  });
}

export async function apiCall(
  resourcePath: string,
  params: Record<string, string> = {}
): Promise<ApiResponse> {
  const config = getConfig();

  const allParams: Record<string, string> = {
    ApiKey: config.apiKey,
    Password: config.password,
    ResponseFormat: "JSON",
    ...params,
  };

  // Remove undefined/empty params
  for (const key of Object.keys(allParams)) {
    if (
      allParams[key] === undefined ||
      allParams[key] === null ||
      allParams[key] === ""
    ) {
      delete allParams[key];
    }
  }

  const url = `${config.apiUrl}${resourcePath}`;
  const body = new URLSearchParams(allParams).toString();

  const rawResponse = await httpsRequest(url, "POST", body);

  try {
    const parsed = JSON.parse(rawResponse) as ApiResponse;
    return parsed;
  } catch {
    // Some responses may not be JSON, return as-is
    return { status: "UNKNOWN", raw_response: rawResponse };
  }
}

export function formatResponse(data: ApiResponse): string {
  return JSON.stringify(data, null, 2);
}

export function buildContactParams(
  prefix: string,
  contact: Record<string, string>
): Record<string, string> {
  const params: Record<string, string> = {};
  const fieldMap: Record<string, string> = {
    firstName: "firstname",
    lastName: "lastname",
    organization: "organization",
    street: "street",
    street2: "street2",
    street3: "street3",
    city: "city",
    countryCode: "countrycode",
    postalCode: "postalcode",
    email: "email",
    phoneNumber: "phonenumber",
    faxNumber: "faxnumber",
    obfuscateEmail: "obfuscateemail",
  };

  for (const [key, apiField] of Object.entries(fieldMap)) {
    if (contact[key]) {
      params[`${prefix}_${apiField}`] = contact[key];
    }
  }
  return params;
}
