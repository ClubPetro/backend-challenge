import { Injectable, Inject } from '@nestjs/common';

import { PlacesRepositoryInterface } from '../repositories/places.repository.interface';
// import { Place } from '../infra/nest/typeorm/entities/place.entity';
import { Place } from '../models/place.model';
import { CreatePlaceDTO } from '../dtos/create-place.dto';

@Injectable()
export class CreatePlaceService {
  constructor(
    @Inject('PlacesRepositoryInterface')
    private readonly placesRepository: PlacesRepositoryInterface,
  ) {
    // do nothing
  }

  async execute(createPlaceDto: CreatePlaceDTO): Promise<Place> {
    const place = await this.placesRepository.create(createPlaceDto);
    return new Place(place);
  }
}
