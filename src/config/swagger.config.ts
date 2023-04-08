import { DocumentBuilder } from '@nestjs/swagger';
import { envConfig } from './enviroment.config';

const { swagger } = envConfig;

export const swaggerConfig = new DocumentBuilder()
  .setTitle(swagger.title)
  .setDescription(swagger.description)
  .setVersion(swagger.version)
  .addServer(swagger.serverUrl, swagger.serverDescription)
  .setContact(swagger.contactName, swagger.contactUrl, swagger.contactEmail)
  .build();
