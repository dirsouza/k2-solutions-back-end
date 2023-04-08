import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OmdbApiController } from './adapter/controllers/omdb-api.controller';
import { EnvironmentConfig } from '../config/enviroment.config';
import { FindMovieService } from './domain/services/find-movie.service';
import { HttpOmdbApiProxy } from './adapter/proxies/http-omdb-api.proxy';

@Module({
  imports: [HttpModule],
  controllers: [OmdbApiController],
  providers: [
    {
      provide: 'OmdbApiProxy',
      useClass: HttpOmdbApiProxy,
    },
    EnvironmentConfig,
    FindMovieService,
  ],
})
export class OmdbApiModule {}
