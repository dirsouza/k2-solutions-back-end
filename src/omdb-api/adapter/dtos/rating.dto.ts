import { ApiProperty } from '@nestjs/swagger';

export class RatingDTO {
  @ApiProperty()
  source: string;
}
