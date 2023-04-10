import { ApiProperty } from '@nestjs/swagger';

export class FavoriteMovieDTO {
  @ApiProperty()
  isFavorite: boolean;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  imdbId?: string;
}
