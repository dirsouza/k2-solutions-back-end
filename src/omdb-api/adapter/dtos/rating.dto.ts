import { ApiProperty } from '@nestjs/swagger';

export class RatingDTO {
  @ApiProperty()
  source?: string;

  @ApiProperty()
  value?: string;
}
