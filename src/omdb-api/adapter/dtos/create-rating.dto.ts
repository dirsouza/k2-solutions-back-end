import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RatingDTO } from './rating.dto';

export class CreateRatingDTO extends PartialType(RatingDTO) {
  @ApiProperty()
  source: string;

  @ApiProperty()
  value: string;
}
