import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OmdbApiModule } from './omdb-api/omdb-api.module';
import { envConfig } from './config/enviroment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    MongooseModule.forRoot(envConfig.mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    OmdbApiModule,
  ],
})
export class AppModule {}
