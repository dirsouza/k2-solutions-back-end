import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { HttpOmdbApiProxy } from '../../../../src/omdb-api/adapter/proxies/http-omdb-api.proxy';
import { EnvironmentConfig } from '../../../../src/config/enviroment.config';
import { movieTypeMock } from '../../../mocks/movie.type.mock';
import { movieEntityMock } from '../../../mocks/movie.entity.mock';

const createAxiosResponse = (
  data: any,
  status: number,
  statusText?: string,
  headers?: any,
  config?: any,
): AxiosResponse<unknown, any> => ({
  data,
  status,
  statusText,
  headers,
  config,
});

describe(HttpOmdbApiProxy.name, () => {
  let testingModule: TestingModule;
  let sut: HttpOmdbApiProxy;
  let httpService: HttpService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        HttpOmdbApiProxy,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: EnvironmentConfig,
          useValue: {
            omdbApi: {
              apiUrl: process.env.API_URL,
              apiKey: process.env.API_KEY,
            },
          },
        },
      ],
    }).compile();

    sut = testingModule.get<HttpOmdbApiProxy>(HttpOmdbApiProxy);
    httpService = testingModule.get<HttpService>(HttpService);
  });

  afterEach(() => testingModule.close());

  describe('findMovieByTitle', () => {
    it('should query the OMDb API and return the search movie', async () => {
      const getSpy = jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of(createAxiosResponse(movieTypeMock, 200)));

      const response = await sut.findMovieByTitle('any_title');

      expect(response).toStrictEqual(movieEntityMock);
      expect(getSpy).toHaveBeenNthCalledWith(
        1,
        `${process.env.API_URL}?t=any_title&apiKey=${process.env.API_KEY}`,
      );
    });

    it('should query OMDb API and return error', async () => {
      const getSpy = jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(
          of(
            createAxiosResponse(
              { ...movieTypeMock, Response: 'False', Error: 'Any error' },
              200,
            ),
          ),
        );

      const response = sut.findMovieByTitle('any_title');

      expect(response).rejects.toThrow('Any error');
      expect(getSpy).toHaveBeenNthCalledWith(
        1,
        `${process.env.API_URL}?t=any_title&apiKey=${process.env.API_KEY}`,
      );
    });
  });
});
