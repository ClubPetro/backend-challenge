import { Injectable, Inject } from '@nestjs/common';

import { PlacesRepositoryInterface } from '../repositories/places.repository.interface';

@Injectable()
export class DeletePlaceService {
  constructor(
    @Inject('PlacesRepositoryInterface')
    private readonly placesRepository: PlacesRepositoryInterface,
  ) {
    // do nothing
  }

  async execute(id: string): Promise<void> {
    await this.placesRepository.remove(id);
  }
}
