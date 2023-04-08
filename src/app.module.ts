import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OmdbApiModule } from './omdb-api/omdb-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    OmdbApiModule,
  ],
})
export class AppModule {}
