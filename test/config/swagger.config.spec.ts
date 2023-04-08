import { swaggerConfig } from '../../src/config/swagger.config';

describe('Swagger Config', () => {
  const documentExpected = {
    openapi: '3.0.0',
    info: {
      title: process.env.SWAGGER_TITLE,
      description: process.env.SWAGGER_DESCRIPTION,
      version: process.env.SWAGGER_VERSION,
      contact: {
        name: process.env.SWAGGER_CONTACT_NAME,
        url: process.env.SWAGGER_CONTACT_URL,
        email: process.env.SWAGGER_CONTACT_EMAIL,
      },
    },
    tags: [],
    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL,
        description: process.env.SWAGGER_SERVER_DESCRIPTION,
        variables: undefined,
      },
    ],
    components: {},
  };

  it('should return a DocumentBuilder to OpenAPI', () => {
    const document = swaggerConfig;

    expect(document).toStrictEqual(documentExpected);
  });
});
