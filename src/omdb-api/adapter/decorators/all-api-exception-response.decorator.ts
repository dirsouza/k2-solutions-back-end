import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ErrorDTO } from '../dtos/error.dto';

export function AllApiExceptionResponse(): any {
  return applyDecorators(
    ApiBadRequestResponse({ description: 'Bad Request', type: ErrorDTO }),
    ApiForbiddenResponse({ description: 'Forbidden', type: ErrorDTO }),
    ApiNotFoundResponse({ description: 'Not Found', type: ErrorDTO }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error',
      type: ErrorDTO,
    }),
  );
}
