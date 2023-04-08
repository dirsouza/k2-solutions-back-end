import { Test, TestingModule } from '@nestjs/testing';
import { FindMovieService } from '../../../../src/omdb-api/domain/services/find-movie.service';
import { OmdbApiProxy } from '../../../../src/omdb-api/domain/proxies/omdb-api.proxy';
import { movieEntityMock } from '../../../mocks/movie.entity.mock';

describe(FindMovieService.name, () => {
  let testingModule: TestingModule;
  let sut: FindMovieService;
  let httpOmdbApiProxy: OmdbApiProxy;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        FindMovieService,
        {
          provide: 'OmdbApiProxy',
          useValue: {
            findMovieByTitle: () => jest.fn(),
          },
        },
      ],
    }).compile();

    sut = testingModule.get<FindMovieService>(FindMovieService);
    httpOmdbApiProxy = testingModule.get<OmdbApiProxy>('OmdbApiProxy');
  });

  afterEach(() => testingModule.close());

  describe('execute', () => {
    it('should return the fetched movie', async () => {
      const findMovieByTitleSpy = jest
        .spyOn(httpOmdbApiProxy, 'findMovieByTitle')
        .mockResolvedValueOnce(movieEntityMock);

      const movie = await sut.execute('any_title');

      expect(movie).toStrictEqual(movieEntityMock);
      expect(findMovieByTitleSpy).toHaveBeenNthCalledWith(1, 'any_title');
    });

    it('should throw error when not returning the fetched movie', async () => {
      const findMovieByTitleSpy = jest
        .spyOn(httpOmdbApiProxy, 'findMovieByTitle')
        .mockResolvedValueOnce(undefined);

      const movie = sut.execute('any_title');

      expect(movie).rejects.toThrow(
        "Couldn't find the movie you were looking for",
      );
      expect(findMovieByTitleSpy).toHaveBeenNthCalledWith(1, 'any_title');
    });
  });

  describe('findMovie', () => {
    it('should throw error when movie search throws error', async () => {
      const findMovieByTitleSpy = jest
        .spyOn(httpOmdbApiProxy, 'findMovieByTitle')
        .mockRejectedValueOnce(new Error('any_error'));

      const movie = sut.execute('any_title');

      expect(movie).rejects.toThrow('Error processing movie fetch');
      expect(findMovieByTitleSpy).toHaveBeenNthCalledWith(1, 'any_title');
    });
  });
});
