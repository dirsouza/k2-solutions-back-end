import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { MovieDTO } from './movie.dto';
import { CreateRatingDTO } from './create-rating.dto';
import { Type } from 'class-transformer';

export class CreateMovieDTO extends PartialType(
  OmitType(MovieDTO, ['title', 'ratings', 'imdbId'] as const),
) {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: [CreateRatingDTO],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateRatingDTO)
  ratings: CreateRatingDTO[];

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  imdbId: string;
}
