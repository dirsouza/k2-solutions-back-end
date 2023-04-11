import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteMovieService } from '../../../../src/omdb-api/domain/services/favorite-movie.service';
import { FavoriteMovieRepository } from '../../../../src/omdb-api/domain/repositories/favorite-movie.repository';
import { movieEntityMock } from '../../../mocks/movie.entity.mock';

describe(FavoriteMovieService.name, () => {
  let testingModule: TestingModule;
  let sut: FavoriteMovieService;
  let mongoFavoriteMovieRepo: FavoriteMovieRepository;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        FavoriteMovieService,
        {
          provide: 'FavoriteMovieRepository',
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = testingModule.get<FavoriteMovieService>(FavoriteMovieService);
    mongoFavoriteMovieRepo = testingModule.get<FavoriteMovieRepository>(
      'FavoriteMovieRepository',
    );
  });

  afterEach(() => testingModule.close());

  describe('getAll', () => {
    it('should return all favorite movies', async () => {
      const expectedMock = Array(5).fill(movieEntityMock);
      const getAllSpy = jest
        .spyOn(mongoFavoriteMovieRepo, 'getAll')
        .mockResolvedValueOnce(expectedMock);

      const favoriteMovies = await sut.getAll();

      expect(getAllSpy).toHaveBeenNthCalledWith(1);
      expect(favoriteMovies).toHaveLength(5);
      expect(favoriteMovies).toStrictEqual(expectedMock);
    });

    it('should return an empty list', async () => {
      const getAllSpy = jest
        .spyOn(mongoFavoriteMovieRepo, 'getAll')
        .mockResolvedValueOnce([]);

      const favoriteMovies = await sut.getAll();

      expect(getAllSpy).toHaveBeenNthCalledWith(1);
      expect(favoriteMovies).toHaveLength(0);
      expect(favoriteMovies).toStrictEqual([]);
    });
  });

  describe('getById', () => {
    it('should return which movie is favorite', async () => {
      const getByIdSpy = jest
        .spyOn(mongoFavoriteMovieRepo, 'getById')
        .mockResolvedValueOnce(movieEntityMock);
      const expectedMock = {
        isFavorite: true,
        title: movieEntityMock?.title,
        imdbId: movieEntityMock?.imdbId,
      };

      const isFavorite = await sut.getById('any_imdbid');

      expect(getByIdSpy).toHaveBeenNthCalledWith(1, 'any_imdbid');
      expect(isFavorite).toStrictEqual(expectedMock);
    });

    it('should return that the movie is not favorite', async () => {
      const getByIdSpy = jest
        .spyOn(mongoFavoriteMovieRepo, 'getById')
        .mockResolvedValueOnce(null);
      const expectedMock = {
        isFavorite: false,
        title: undefined,
        imdbId: undefined,
      };

      const isFavorite = await sut.getById('any_imdbid');

      expect(getByIdSpy).toHaveBeenNthCalledWith(1, 'any_imdbid');
      expect(isFavorite).toStrictEqual(expectedMock);
    });
  });

  describe('create', () => {
    it('should save a favorite movie', async () => {
      const getByIdSpy = jest
        .spyOn(mongoFavoriteMovieRepo, 'getById')
        .mockResolvedValueOnce(null);
      const saveSpy = jest
        .spyOn(mongoFavoriteMovieRepo, 'save')
        .mockResolvedValueOnce(movieEntityMock);

      const favoriteMovie = await sut.create(movieEntityMock);

      expect(getByIdSpy).toHaveBeenNthCalledWith(1, movieEntityMock.imdbId);
      expect(saveSpy).toHaveBeenNthCalledWith(1, movieEntityMock);
      expect(favoriteMovie).toStrictEqual(movieEntityMock);
    });

    it('should throw error when trying to save a favorite movie that already exists', async () => {
      const getByIdSpy = jest
        .spyOn(mongoFavoriteMovieRepo, 'getById')
        .mockResolvedValueOnce(movieEntityMock);

      expect(sut.create(movieEntityMock)).rejects.toThrow(
        "Favorite movie 'any_Title' with IMDbID 'any_imdbID' already exists",
      );
      expect(getByIdSpy).toHaveBeenNthCalledWith(1, movieEntityMock.imdbId);
    });
  });
});
