import axios, { AxiosInstance } from "axios";

export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
  }

  async get(endpoint: string, params = {}): Promise<any> {
    return this.client.get(endpoint, { params });
  }

  async post(endpoint: string, data: any): Promise<any> {
    return this.client.post(endpoint, data);
  }
}
