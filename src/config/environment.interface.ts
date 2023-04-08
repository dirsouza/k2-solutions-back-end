export interface App {
  environment: string;
  port: number;
}

export interface OmdbApi {
  apiUrl: string;
  apiKey: string;
}

export interface Swagger {
  title: string;
  description: string;
  version: string;
  serverUrl: string;
  serverDescription: string;
  contactName: string;
  contactUrl: string;
  contactEmail: string;
}
