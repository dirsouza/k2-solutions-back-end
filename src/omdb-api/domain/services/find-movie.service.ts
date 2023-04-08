import { Inject, Injectable, Logger } from '@nestjs/common';
import { MovieEntity } from '../enitities/movie.entity';
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
      this.logger.error("Couldn't find the movie you were looking for");
      throw new BusinessError(
        ExceptionCodeEnum.MOVIE_NOT_FOUND,
        "Couldn't find the movie you were looking for",
      );
    }

    return movie;
  }

  private async findMovie(title: string): Promise<MovieEntity> {
    try {
      return await this.httpOmdbApiProxy.findMovieByTitle(title);
    } catch (error) {
      this.logger.error('Error processing movie fetch', error);
      throw new BusinessError(
        ExceptionCodeEnum.UNEXPECTED_ERROR_MOVIE,
        'Error processing movie fetch',
      );
    }
  }
}
