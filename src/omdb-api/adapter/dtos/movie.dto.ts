import { ApiProperty } from '@nestjs/swagger';
import { RatingDTO } from './rating.dto';

export class MovieDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  year: string;

  @ApiProperty()
  rated: string;

  @ApiProperty()
  released: string;

  @ApiProperty()
  runtime: string;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  director: string;

  @ApiProperty()
  writer: string;

  @ApiProperty()
  actors: string;

  @ApiProperty()
  plot: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  awards: string;

  @ApiProperty()
  poster: string;

  @ApiProperty({
    type: [RatingDTO],
  })
  ratings: RatingDTO[];

  @ApiProperty()
  metascore: string;

  @ApiProperty()
  imdbRating: string;

  @ApiProperty()
  imdbVotes: string;

  @ApiProperty()
  imdbId: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  dvd: string;

  @ApiProperty()
  boxOffice: string;

  @ApiProperty()
  production: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  response: string;
}
