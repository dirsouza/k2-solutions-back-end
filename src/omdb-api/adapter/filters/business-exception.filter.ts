import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BusinessError } from '../../domain/errors/business.error';
import { ExceptionCodeEnum } from '../../domain/enums/exception-code.enum';

@Catch(BusinessError)
export class BusinessExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = this.getHttpStatus(exception);

    const responseBody = {
      statusCode: status,
      message: exception.message,
      error: exception.name,
      timestamp: new Date().toISOString(),
      path: request.url,
      detail: {
        statusCode: status,
        message: exception.message,
        error: exception.name,
      },
    };

    response.status(status).json(responseBody);
  }

  private getHttpStatus(exception: BusinessError): number {
    const exceptionList = {
      [ExceptionCodeEnum.UNEXPECTED_ERROR_MOVIE]:
        HttpStatus.INTERNAL_SERVER_ERROR,
      [ExceptionCodeEnum.MOVIE_NOT_FOUND]: HttpStatus.NOT_FOUND,
    } as const;

    return exceptionList[exception.name] ?? HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
