import { Document, Schema } from 'mongoose';
import { MovieEntity } from '../../../domain/entities/movie.entity';
import { RatingEntity } from '../../../domain/entities/rating.entity';

export interface MovieDocument extends Document, MovieEntity {}

const RatingSchema = new Schema<RatingEntity>({
  source: { type: String },
  value: { type: String },
});

export const FavoriteMovieSchema = new Schema<MovieDocument>(
  {
    title: { type: String, index: true },
    year: { type: String },
    rated: { type: String },
    released: { type: String },
    runtime: { type: String },
    genre: { type: String },
    director: { type: String },
    writer: { type: String },
    actors: { type: String },
    plot: { type: String },
    language: { type: String },
    country: { type: String },
    awards: { type: String },
    poster: { type: String },
    ratings: { type: [RatingSchema] },
    metascore: { type: String },
    imdbRating: { type: String },
    imdbVotes: { type: String },
    imdbId: { type: String, index: true },
    type: { type: String },
    dvd: { type: String },
    boxOffice: { type: String },
    production: { type: String },
    website: { type: String },
    response: { type: String },
  },
  {
    collection: 'favorite_movies',
    id: false,
    versionKey: false,
    toObject: {
      virtuals: true,
      transform: (_doc, ret) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...obj } = ret;
        return {
          ...obj,
          ratings: obj.ratings?.map(({ source, value }) => ({
            source,
            value,
          })),
        };
      },
    },
  },
).index({
  '$**': 1,
});
