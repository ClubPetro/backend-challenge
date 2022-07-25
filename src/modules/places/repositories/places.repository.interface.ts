/* eslint-disable @typescript-eslint/no-empty-interface */
import { GenericInterfaceRepository } from '@core/repositories/generic-interface.repository';

import { Place } from '../infra/nest/typeorm/entities/place.entity';

export interface PlacesRepositoryInterface
  extends GenericInterfaceRepository<Place> {
  // nothing
}
