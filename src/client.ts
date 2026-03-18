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

let _config: ClientConfig | null = null;

export function setConfig(config: ClientConfig): void {
  _config = config;
}

export function setConfigFromEnv(): void {
  const apiKey = process.env.INTERNETBS_API_KEY;
  const password = process.env.INTERNETBS_PASSWORD;
  const apiUrl =
    process.env.INTERNETBS_API_URL || "https://testapi.internet.bs";

  if (!apiKey || !password) {
    throw new Error(
      "Missing INTERNETBS_API_KEY or INTERNETBS_PASSWORD environment variables"
    );
  }

  _config = { apiKey, password, apiUrl };
}

function getConfig(): ClientConfig {
  if (!_config) {
    throw new Error("Client not configured. Call setConfig() or setConfigFromEnv() first.");
  }
  return _config;
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

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
    signal: AbortSignal.timeout(25000),
  });

  const rawResponse = await response.text();

  try {
    const parsed = JSON.parse(rawResponse) as ApiResponse;
    return parsed;
  } catch {
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
