import { MovieEntity } from '../entities/movie.entity';

export interface OmdbApiProxy {
  findMovieByTitle(title: string): Promise<MovieEntity>;
}
