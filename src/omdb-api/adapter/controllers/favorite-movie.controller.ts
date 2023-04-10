import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BusinessExceptionFilter } from '../filters/business-exception.filter';
import { AllApiExceptionResponse } from '../decorators/all-api-exception-response.decorator';
import { MovieDTO } from '../dtos/movie.dto';
import { FavoriteMovieService } from '../../domain/services/favorite-movie.service';
import { CreateMovieDTO } from '../dtos/create-movie.dto';
import { FavoriteMovieDTO } from '../dtos/favorite-movie.dto';
import { ErrorDTO } from '../dtos/error.dto';

@Controller('favorite-movie')
@ApiTags('Favorite Movie')
@UseFilters(BusinessExceptionFilter)
export class FavoriteMovieController {
  constructor(private readonly favoriteMovieService: FavoriteMovieService) {}

  @Get()
  @ApiOperation({
    summary: 'Search favorite movies',
    description: 'Search all favorite movies',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successful search', type: [MovieDTO] })
  @AllApiExceptionResponse()
  async favoriteMovies(): Promise<MovieDTO[]> {
    return this.favoriteMovieService.getAll();
  }

  @Get(':imdbId')
  @ApiOperation({
    summary: 'Check favorite movie',
    description: 'Check if the movie is favorited by IMDbID',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successful checked', type: FavoriteMovieDTO })
  @AllApiExceptionResponse()
  async favoriteMovieById(
    @Param('imdbId') id: string,
  ): Promise<FavoriteMovieDTO> {
    return this.favoriteMovieService.getById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Register favorite movie',
    description: 'Register a favorite movie',
  })
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ description: 'Successful registered', type: MovieDTO })
  @ApiConflictResponse({ description: 'Conflict', type: ErrorDTO })
  @AllApiExceptionResponse()
  async favoriteMovieCreate(@Body() movie: CreateMovieDTO): Promise<MovieDTO> {
    return this.favoriteMovieService.create(movie);
  }
}
