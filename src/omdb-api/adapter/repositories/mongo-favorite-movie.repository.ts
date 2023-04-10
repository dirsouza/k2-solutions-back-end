import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieEntity } from '../../domain/entities/movie.entity';
import { FavoriteMovieRepository } from '../../domain/repositories/favorite-movie.repository';
import { MovieDocument } from './schemas/favorite-movie.schema';

@Injectable()
export class MongoFavoriteMovieRepository implements FavoriteMovieRepository {
  constructor(
    @InjectModel('FavoriteMovie')
    private readonly favoriteMovieModel: Model<MovieDocument>,
  ) {}

  async getAll(): Promise<MovieEntity[]> {
    const favoriteMovies = await this.favoriteMovieModel.find().exec();
    if (!favoriteMovies?.length) return [];

    return favoriteMovies.map((movie) => movie.toObject());
  }

  async getById(id: string): Promise<MovieEntity> {
    const favoriteMovie = await this.favoriteMovieModel
      .findOne({ imdbId: id })
      .exec();
    if (!favoriteMovie) return null;

    return favoriteMovie.toObject();
  }

  async save(movie: MovieEntity): Promise<MovieEntity> {
    const favoriteMovie = await this.favoriteMovieModel.create(movie);

    return favoriteMovie.toObject();
  }
}
