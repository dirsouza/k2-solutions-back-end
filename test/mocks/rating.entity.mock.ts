import { RatingEntity } from '../../src/omdb-api/domain/entities/rating.entity';
import { ratingTypeMock } from './rating.type.mock';

export const ratingEntityMock: RatingEntity = {
  source: ratingTypeMock.Source,
  value: ratingTypeMock.Value,
};
