import { Injectable, Inject } from '@nestjs/common';

import { PlacesRepositoryInterface } from '../repositories/places.repository.interface';
import { Place } from '../models/place.model';
// import { Place } from '../infra/nest/typeorm/entities/place.entity';

@Injectable()
export class GetPlaceByIdService {
  constructor(
    @Inject('PlacesRepositoryInterface')
    private readonly placesRepository: PlacesRepositoryInterface,
  ) {
    // do nothing
  }

  async execute(id: string): Promise<Place> {
    const result = await this.placesRepository.findOneById(id);
    return new Place(result);
  }
}
