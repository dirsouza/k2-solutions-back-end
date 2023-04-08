import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ErrorDetailDTO } from './error-detail.dto';

@ApiExtraModels(ErrorDetailDTO)
export class ErrorDTO {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  error: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { $ref: getSchemaPath(ErrorDetailDTO) }],
  })
  detail: string | ErrorDetailDTO;
}
