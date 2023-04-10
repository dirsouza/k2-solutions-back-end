import { MovieEntity } from '../entities/movie.entity';

export interface FavoriteMovieRepository {
  getAll(): Promise<MovieEntity[]>;
  getById(id: string): Promise<MovieEntity>;
  save(movie: MovieEntity): Promise<MovieEntity>;
}
