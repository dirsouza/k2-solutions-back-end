import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { OmdbApiController } from './adapter/controllers/omdb-api.controller';
import { EnvironmentConfig } from '../config/enviroment.config';
import { HttpOmdbApiProxy } from './adapter/proxies/http-omdb-api.proxy';
import { FavoriteMovieSchema } from './adapter/repositories/schemas/favorite-movie.schema';
import { MongoFavoriteMovieRepository } from './adapter/repositories/mongo-favorite-movie.repository';
import { FindMovieService } from './domain/services/find-movie.service';
import { FavoriteMovieService } from './domain/services/favorite-movie.service';
import { FavoriteMovieController } from './adapter/controllers/favorite-movie.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'FavoriteMovie', schema: FavoriteMovieSchema },
    ]),
  ],
  controllers: [OmdbApiController, FavoriteMovieController],
  providers: [
    {
      provide: 'OmdbApiProxy',
      useClass: HttpOmdbApiProxy,
    },
    {
      provide: 'FavoriteMovieRepository',
      useClass: MongoFavoriteMovieRepository,
    },
    EnvironmentConfig,
    FindMovieService,
    FavoriteMovieService,
  ],
})
export class OmdbApiModule {}
