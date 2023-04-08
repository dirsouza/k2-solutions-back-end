import { MovieEntity } from '../enitities/movie.entity';

export interface OmdbApiProxy {
  findMovieByTitle(title: string): Promise<MovieEntity>;
}
