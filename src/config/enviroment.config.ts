import { App, Mongo, OmdbApi, Swagger } from './environment.interface';

export class EnvironmentConfig {
  get app(): App {
    return {
      environment: process.env.NODE_ENV,
      port: Number(process.env.PORT),
    };
  }

  get omdbApi(): OmdbApi {
    return {
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY,
    };
  }

  get mongo(): Mongo {
    const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;

    return {
      url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`,
    };
  }

  get swagger(): Swagger {
    return {
      title: process.env.SWAGGER_TITLE,
      description: process.env.SWAGGER_DESCRIPTION,
      version: process.env.SWAGGER_VERSION,
      serverUrl: process.env.SWAGGER_SERVER_URL,
      serverDescription: process.env.SWAGGER_SERVER_DESCRIPTION,
      contactName: process.env.SWAGGER_CONTACT_NAME,
      contactUrl: process.env.SWAGGER_CONTACT_URL,
      contactEmail: process.env.SWAGGER_CONTACT_EMAIL,
    };
  }
}

export const envConfig = new EnvironmentConfig();
