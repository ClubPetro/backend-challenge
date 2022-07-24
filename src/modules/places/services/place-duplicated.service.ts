import { Injectable, Inject } from '@nestjs/common';

import { EntityDuplicated } from '@core/exception/exception.types';

import { PlacesRepositoryInterface } from '../repositories/places.repository.interface';

interface IRequest {
  id?: string;
  location: string;
  country?: string;
}

@Injectable()
export class PlaceDuplicatedService {
  private message = 'país com está localização';
  constructor(
    @Inject('PlacesRepositoryInterface')
    private readonly placesRepository: PlacesRepositoryInterface,
  ) {
    // do nothing
  }

  async execute({ id, location, country }: IRequest): Promise<void> {
    if (id) {
      const place = await this.placesRepository.findOneById(id);
      const exists = await this.placesRepository.findByCondition({
        country: place.country,
        location,
      });
      if (exists) {
        throw new EntityDuplicated(this.message);
      }
    }

    if (country) {
      const place = await this.placesRepository.findByCondition({
        country,
        location,
      });
      if (place) {
        throw new EntityDuplicated(this.message);
      }
    }
  }
}
