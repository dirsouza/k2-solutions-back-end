import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { BusinessExceptionFilter } from '../../../../src/omdb-api/adapter/filters/business-exception.filter';
import { BusinessError } from '../../../../src/omdb-api/domain/errors/business.error';
import { ExceptionCodeEnum } from '../../../../src/omdb-api/domain/enums/exception-code.enum';
import {
  argumentsHostMock,
  getRequestMock,
  getResponseMock,
  httpArgumentsHostMock,
  jsonMock,
  statusMock,
} from '../../../mocks/arguments-hosts.mock';

describe(BusinessExceptionFilter.name, () => {
  let testingModule: TestingModule;
  let sut: BusinessExceptionFilter;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [BusinessExceptionFilter],
    }).compile();

    sut = testingModule.get<BusinessExceptionFilter>(BusinessExceptionFilter);
  });

  afterEach(() => testingModule.close());

  it('should return internal server error if throw a error UNEXPECTED_ERROR_MOVIE', () => {
    const responseExpected = {
      detail: {
        error: 'Unexpected error fetching movie',
        message: 'Any error',
        statusCode: 500,
      },
      error: 'Unexpected error fetching movie',
      message: 'Any error',
      path: 'http://mazude.pt/vukig',
      statusCode: 500,
      timestamp: '2023-01-31T00:00:00.000Z',
    };
    const dateMock = new Date('2023-01-31');
    jest.spyOn(global, 'Date').mockImplementationOnce(() => dateMock);

    sut.catch(
      new BusinessError(ExceptionCodeEnum.UNEXPECTED_ERROR_MOVIE, 'Any error'),
      argumentsHostMock,
    );

    expect(httpArgumentsHostMock).toHaveBeenNthCalledWith(1);
    expect(getResponseMock).toHaveBeenNthCalledWith(1);
    expect(getRequestMock).toHaveBeenNthCalledWith(1);
    expect(statusMock).toHaveBeenNthCalledWith(
      1,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(jsonMock).toHaveBeenNthCalledWith(1, responseExpected);
  });
});
