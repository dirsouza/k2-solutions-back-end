import { Inject, Injectable, Logger } from '@nestjs/common';
import { MovieEntity } from '../entities/movie.entity';
import { OmdbApiProxy } from '../proxies/omdb-api.proxy';
import { BusinessError } from '../errors/business.error';
import { ExceptionCodeEnum } from '../enums/exception-code.enum';

@Injectable()
export class FindMovieService {
  private readonly logger = new Logger(FindMovieService.name);

  constructor(
    @Inject('OmdbApiProxy')
    private readonly httpOmdbApiProxy: OmdbApiProxy,
  ) {}

  async execute(title: string): Promise<MovieEntity> {
    const movie = await this.findMovie(title);
    if (!movie) {
      const msg = "Couldn't find the movie you were looking for";
      this.logger.error(msg);
      throw new BusinessError(ExceptionCodeEnum.MOVIE_NOT_FOUND, msg);
    }

    return movie;
  }

  private async findMovie(title: string): Promise<MovieEntity> {
    try {
      return await this.httpOmdbApiProxy.findMovieByTitle(title);
    } catch (error) {
      const msg = 'Error processing movie fetch';
      this.logger.error(msg, error);
      throw new BusinessError(ExceptionCodeEnum.UNEXPECTED_ERROR_MOVIE, msg);
    }
  }
}
