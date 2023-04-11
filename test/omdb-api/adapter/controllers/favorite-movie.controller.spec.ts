import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteMovieController } from '../../../../src/omdb-api/adapter/controllers/favorite-movie.controller';
import { FavoriteMovieService } from '../../../../src/omdb-api/domain/services/favorite-movie.service';
import { movieEntityMock } from '../../../mocks/movie.entity.mock';
import { plainToClass } from 'class-transformer';
import { CreateMovieDTO } from '../../../../src/omdb-api/adapter/dtos/create-movie.dto';
import { movieTypeMock } from '../../../mocks/movie.type.mock';

describe(FavoriteMovieController.name, () => {
  let testingModule: TestingModule;
  let sut: FavoriteMovieController;
  let favoriteMovieService: FavoriteMovieService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [FavoriteMovieController],
      providers: [
        {
          provide: FavoriteMovieService,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = testingModule.get<FavoriteMovieController>(FavoriteMovieController);
    favoriteMovieService =
      testingModule.get<FavoriteMovieService>(FavoriteMovieService);
  });

  afterEach(() => testingModule.close());

  describe('GET /', () => {
    it('should return all favorite movies', async () => {
      const expectedMock = Array(5).fill(movieEntityMock);
      jest
        .spyOn(favoriteMovieService, 'getAll')
        .mockResolvedValueOnce(expectedMock);

      const response = await sut.favoriteMovies();

      expect(response).toEqual(expectedMock);
    });
  });

  describe('GET /:imdbId', () => {
    it('should return favorite movie by IMDbId', async () => {
      const expectedMock = {
        isFavorite: true,
        title: movieEntityMock?.title,
        imdbId: movieEntityMock?.imdbId,
      };
      jest
        .spyOn(favoriteMovieService, 'getById')
        .mockResolvedValueOnce(expectedMock);

      const response = await sut.favoriteMovieById('any_imdbid');

      expect(response).toEqual(expectedMock);
    });
  });

  describe('POST /', () => {
    it('should save a favorite movie', async () => {
      jest
        .spyOn(favoriteMovieService, 'create')
        .mockResolvedValueOnce(movieEntityMock);
      const createMovieMock = plainToClass(CreateMovieDTO, movieTypeMock);

      const response = await sut.favoriteMovieCreate(createMovieMock);

      expect(response).toEqual(movieEntityMock);
    });
  });
});
