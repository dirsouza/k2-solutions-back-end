import { ArgumentsHost } from '@nestjs/common';

export const jsonMock = jest.fn();

export const statusMock = jest.fn().mockImplementation(() => ({
  json: jsonMock,
}));

export const getResponseMock = jest.fn().mockImplementation(() => ({
  status: statusMock,
}));

export const getRequestMock = jest.fn().mockImplementation(() => ({
  url: 'http://mazude.pt/vukig',
}));

export const httpArgumentsHostMock = jest.fn().mockImplementation(() => ({
  getResponse: getResponseMock,
  getRequest: getRequestMock,
}));

export const argumentsHostMock = {
  switchToHttp: httpArgumentsHostMock,
} as unknown as ArgumentsHost;
