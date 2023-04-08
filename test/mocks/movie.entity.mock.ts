import { MovieEntity } from '../../src/omdb-api/domain/enitities/movie.entity';
import { movieTypeMock } from './movie.type.mock';
import { ratingEntityMock } from './rating.entity.mock';

export const movieEntityMock: MovieEntity = {
  title: movieTypeMock.Title,
  year: movieTypeMock.Year,
  rated: movieTypeMock.Rated,
  released: movieTypeMock.Released,
  runtime: movieTypeMock.Runtime,
  genre: movieTypeMock.Genre,
  director: movieTypeMock.Director,
  writer: movieTypeMock.Writer,
  actors: movieTypeMock.Actors,
  plot: movieTypeMock.Plot,
  language: movieTypeMock.Language,
  country: movieTypeMock.Country,
  awards: movieTypeMock.Awards,
  poster: movieTypeMock.Poster,
  ratings: Array(3).fill(ratingEntityMock),
  metascore: movieTypeMock.Metascore,
  imdbRating: movieTypeMock.imdbRating,
  imdbVotes: movieTypeMock.imdbVotes,
  imdbId: movieTypeMock.imdbID,
  type: movieTypeMock.Type,
  dvd: movieTypeMock.DVD,
  boxOffice: movieTypeMock.BoxOffice,
  production: movieTypeMock.Production,
  website: movieTypeMock.Website,
  response: movieTypeMock.Response,
};
