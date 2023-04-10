import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { EnvironmentConfig } from '../../../config/enviroment.config';
import { OmdbApiProxy } from '../../domain/proxies/omdb-api.proxy';
import { MovieEntity } from '../../domain/entities/movie.entity';
import { RatingEntity } from '../../domain/entities/rating.entity';
import { MovieType } from './types/movie.type';
import { RatingType } from './types/rating.type';

@Injectable()
export class HttpOmdbApiProxy implements OmdbApiProxy {
  constructor(
    private readonly httpService: HttpService,
    private readonly envConfig: EnvironmentConfig,
  ) {}

  async findMovieByTitle(title: string): Promise<MovieEntity> {
    const { omdbApi } = this.envConfig;
    const query = new URLSearchParams({
      t: title,
      apiKey: omdbApi.apiKey,
    }).toString();

    const { data } = await lastValueFrom(
      this.httpService.get<MovieType>(`${omdbApi.apiUrl}?${query}`),
    );

    if (data?.Response === 'False') {
      throw new Error(data?.Error ?? 'Movie not found');
    }

    return this.mapToMove(data);
  }

  private mapToMove(entity: MovieType): MovieEntity {
    return {
      title: entity.Title,
      year: entity.Year,
      rated: entity.Rated,
      released: entity.Released,
      runtime: entity.Runtime,
      genre: entity.Genre,
      director: entity.Director,
      writer: entity.Writer,
      actors: entity.Actors,
      plot: entity.Plot,
      language: entity.Language,
      country: entity.Country,
      awards: entity.Awards,
      poster: entity.Poster,
      ratings: entity.Ratings?.map(this.mapToRating),
      metascore: entity.Metascore,
      imdbRating: entity.imdbRating,
      imdbVotes: entity.imdbVotes,
      imdbId: entity.imdbID,
      type: entity.Type,
      dvd: entity.DVD,
      boxOffice: entity.BoxOffice,
      production: entity.Production,
      website: entity.Website,
      response: entity.Response,
    };
  }

  private mapToRating(entity: RatingType): RatingEntity {
    return {
      source: entity.Source,
      value: entity.Value,
    };
  }
}
