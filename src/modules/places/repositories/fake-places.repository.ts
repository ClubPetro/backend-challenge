import { FakeGenericAbstractRepository } from '@core/repositories/fake-generic-abstract.repository';

import { Place } from '../infra/nest/typeorm/entities/place.entity';
import { PlacesRepositoryInterface } from './places.repository.interface';

export class FakePlacesRepository
  extends FakeGenericAbstractRepository<Place>
  implements PlacesRepositoryInterface {
  // nothing
}
