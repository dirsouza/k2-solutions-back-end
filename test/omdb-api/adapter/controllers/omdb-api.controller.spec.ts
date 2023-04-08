import { Test, TestingModule } from '@nestjs/testing';
import { OmdbApiController } from '../../../../src/omdb-api/adapter/controllers/omdb-api.controller';
import { FindMovieService } from '../../../../src/omdb-api/domain/services/find-movie.service';
import { movieEntityMock } from '../../../mocks/movie.entity.mock';

describe(OmdbApiController.name, () => {
  let testingModule: TestingModule;
  let sut: OmdbApiController;
  let findMovieService: FindMovieService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [OmdbApiController],
      providers: [
        {
          provide: FindMovieService,
          useValue: {
            execute: () => jest.fn(),
          },
        },
      ],
    }).compile();

    sut = testingModule.get<OmdbApiController>(OmdbApiController);
    findMovieService = testingModule.get<FindMovieService>(FindMovieService);
  });

  afterEach(() => testingModule.close());

  describe('GET /movie/:title', () => {
    it('should return the fetched movie', async () => {
      jest
        .spyOn(findMovieService, 'execute')
        .mockResolvedValueOnce(movieEntityMock);

      const response = await sut.movie('any_title');

      expect(response).toStrictEqual(movieEntityMock);
    });
  });
});
