import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseFilters,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BusinessExceptionFilter } from '../filters/business-exception.filter';
import { AllApiExceptionResponse } from '../decorators/all-api-exception-response.decorator';
import { MovieDTO } from '../dtos/movie.dto';
import { FindMovieService } from '../../domain/services/find-movie.service';

@Controller('omdb-api')
@ApiTags('OMDb API')
@UseFilters(BusinessExceptionFilter)
export class OmdbApiController {
  constructor(private readonly findMovieService: FindMovieService) {}

  @Get('movie/:title')
  @ApiOperation({
    summary: 'Search movies',
    description: 'Search movies by title',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successful search', type: MovieDTO })
  @AllApiExceptionResponse()
  async movie(@Param('title') title: string): Promise<MovieDTO> {
    return this.findMovieService.execute(title);
  }
}
