import { Inject, Injectable, Logger } from '@nestjs/common';
import { FavoriteMovieRepository } from '../repositories/favorite-movie.repository';
import { MovieEntity } from '../entities/movie.entity';
import { BusinessError } from '../errors/business.error';
import { ExceptionCodeEnum } from '../enums/exception-code.enum';
import { FavoriteMovieEntity } from '../entities/favorite-movie.entity';

@Injectable()
export class FavoriteMovieService {
  private readonly logger = new Logger(FavoriteMovieService.name);

  constructor(
    @Inject('FavoriteMovieRepository')
    private readonly mongoFavoriteMovieRepo: FavoriteMovieRepository,
  ) {}

  async getAll(): Promise<MovieEntity[]> {
    const favoriteMovies = await this.mongoFavoriteMovieRepo.getAll();
    if (!favoriteMovies?.length) this.logger.warn('No favorite movies found');

    return favoriteMovies;
  }

  async getById(id: string): Promise<FavoriteMovieEntity> {
    const favoriteMovie = await this.mongoFavoriteMovieRepo.getById(id);

    return {
      isFavorite: !!favoriteMovie,
      title: favoriteMovie?.title,
      imdbId: favoriteMovie?.imdbId,
    };
  }

  async create(movie: MovieEntity): Promise<MovieEntity> {
    const exists = await this.mongoFavoriteMovieRepo.getById(movie.imdbId);
    if (exists) {
      const msg = `Favorite movie '${movie.title}' with IMDbID '${movie.imdbId}' already exists`;
      this.logger.error(msg);
      throw new BusinessError(ExceptionCodeEnum.MOVIE_ALREADY_EXISTS, msg);
    }

    const favoriteMovie = await this.mongoFavoriteMovieRepo.save(movie);
    return favoriteMovie;
  }
}
