import axios from "axios";

const client = axios.create({
  baseURL: process.env.BASE_URL || "https://parabank.parasoft.com"
});

export async function get(
  endpoint: string,
  params = {},
  headers = {}
): Promise<any> {
  return client.get(endpoint, { params, headers });
}

export async function post(
  endpoint: string,
  data: any,
  headers = {}
): Promise<any> {
  return client.post(endpoint, data, { headers });
}

export async function validateTransactions(
  accountId: number,
  amount: number,
  jsessionId: string
): Promise<any> {
  const endpoint = `/parabank/services_proxy/bank/accounts/${accountId}/transactions/amount/${amount}?timeout=30000`;
  const headers = {
    Cookie: `JSESSIONID=${jsessionId}`
  };

  console.log("Requesting", endpoint, "with headers", headers);
  const response = await get(endpoint, {}, headers);
  return response.data; // Return the response body
}
