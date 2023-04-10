import { EnvironmentConfig } from '../../src/config/enviroment.config';

describe(EnvironmentConfig.name, () => {
  const envConfig = new EnvironmentConfig();

  it('should return app data', () => {
    const appExpected = {
      environment: process.env.NODE_ENV,
      port: Number(process.env.PORT),
    };

    const app = envConfig.app;

    expect(app).toStrictEqual(appExpected);
  });

  it('should return omdbApi data', () => {
    const omdbApiExpected = {
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY,
    };

    const omdbApi = envConfig.omdbApi;

    expect(omdbApi).toStrictEqual(omdbApiExpected);
  });

  it('should return mongo data', () => {
    const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;
    const mongoExpected = {
      url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`,
    };

    const mongo = envConfig.mongo;

    expect(mongo).toStrictEqual(mongoExpected);
  });

  it('should return swagger data', () => {
    const swaggerExpected = {
      title: process.env.SWAGGER_TITLE,
      description: process.env.SWAGGER_DESCRIPTION,
      version: process.env.SWAGGER_VERSION,
      serverUrl: process.env.SWAGGER_SERVER_URL,
      serverDescription: process.env.SWAGGER_SERVER_DESCRIPTION,
      contactName: process.env.SWAGGER_CONTACT_NAME,
      contactUrl: process.env.SWAGGER_CONTACT_URL,
      contactEmail: process.env.SWAGGER_CONTACT_EMAIL,
    };

    const swagger = envConfig.swagger;

    expect(swagger).toStrictEqual(swaggerExpected);
  });
});
