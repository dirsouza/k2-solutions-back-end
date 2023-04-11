import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoFavoriteMovieRepository } from '../../../../src/omdb-api/adapter/repositories/mongo-favorite-movie.repository';
import { FavoriteMovieRepository } from '../../../../src/omdb-api/domain/repositories/favorite-movie.repository';
import { MovieDocument } from '../../../../src/omdb-api/adapter/repositories/schemas/favorite-movie.schema';
import { movieEntityMock } from '../../../mocks/movie.entity.mock';

describe(MongoFavoriteMovieRepository.name, () => {
  let testingModule: TestingModule;
  let sut: FavoriteMovieRepository;
  let favoriteMovieModel: Model<MovieDocument>;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        MongoFavoriteMovieRepository,
        {
          provide: getModelToken('FavoriteMovie'),
          useValue: {
            find: jest.fn,
            findOne: jest.fn,
            create: jest.fn,
          },
        },
      ],
    }).compile();

    sut = testingModule.get<MongoFavoriteMovieRepository>(
      MongoFavoriteMovieRepository,
    );
    favoriteMovieModel = testingModule.get<Model<MovieDocument>>(
      getModelToken('FavoriteMovie'),
    );
  });

  afterEach(() => testingModule.close());

  describe('getAll', () => {
    it('should return all favorite movies', async () => {
      const findSpy = jest.spyOn(favoriteMovieModel, 'find').mockReturnValue({
        exec: jest
          .fn()
          .mockResolvedValueOnce(
            Array(5).fill({ toObject: () => movieEntityMock }),
          ),
      } as any);

      const favoriteMovies = await sut.getAll();

      expect(findSpy).toHaveBeenNthCalledWith(1);
      expect(favoriteMovies).toHaveLength(5);
      expect(favoriteMovies).toStrictEqual(Array(5).fill(movieEntityMock));
    });

    it('should return an empty list', async () => {
      const findSpy = jest.spyOn(favoriteMovieModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([]),
      } as any);

      const favoriteMovies = await sut.getAll();

      expect(findSpy).toHaveBeenNthCalledWith(1);
      expect(favoriteMovies).toHaveLength(0);
      expect(favoriteMovies).toStrictEqual([]);
    });
  });

  describe('getById', () => {
    it('should return favorite movie by IMDbId', async () => {
      const findOneSpy = jest
        .spyOn(favoriteMovieModel, 'findOne')
        .mockReturnValue({
          exec: jest
            .fn()
            .mockResolvedValueOnce({ toObject: () => movieEntityMock }),
        } as any);

      const favoriteMovie = await sut.getById('any_id');

      expect(findOneSpy).toHaveBeenNthCalledWith(1, { imdbId: 'any_id' });
      expect(favoriteMovie).toStrictEqual(movieEntityMock);
    });

    it('should return null when not finding favorite movie', async () => {
      const findOneSpy = jest
        .spyOn(favoriteMovieModel, 'findOne')
        .mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as any);

      const favoriteMovie = await sut.getById('any_id');

      expect(findOneSpy).toHaveBeenNthCalledWith(1, { imdbId: 'any_id' });
      expect(favoriteMovie).toBeNull();
    });
  });

  describe('save', () => {
    it('should save a favorite movie', async () => {
      const createSpy = jest
        .spyOn(favoriteMovieModel, 'create')
        .mockImplementationOnce(
          () => Promise.resolve({ toObject: () => movieEntityMock }) as any,
        );

      const favoriteMovie = await sut.save(movieEntityMock);
      expect(createSpy).toHaveBeenNthCalledWith(1, movieEntityMock);
      expect(favoriteMovie).toStrictEqual(movieEntityMock);
    });
  });
});
