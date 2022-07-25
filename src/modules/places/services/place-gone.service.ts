import { Injectable, Inject } from '@nestjs/common';

import { EntityGone } from '@core/exception/exception.types';

import { PlacesRepositoryInterface } from '../repositories/places.repository.interface';

@Injectable()
export class PlaceGoneService {
  constructor(
    @Inject('PlacesRepositoryInterface')
    private readonly placesRepository: PlacesRepositoryInterface,
  ) {
    // do nothing
  }

  async execute(id: string): Promise<void> {
    const place = await this.placesRepository.findOneById(id);
    if (!place) {
      throw new EntityGone('Lugar');
    }
  }
}
