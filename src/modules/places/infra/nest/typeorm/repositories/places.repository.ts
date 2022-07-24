import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { GenericAbstractRepository } from '@core/repositories/generic-abstract.repository';

import { Place } from '../entities/place.entity';
import { PlacesRepositoryInterface } from '@modules/places/repositories/places.repository.interface';

@Injectable()
export class PlacesRepository
  extends GenericAbstractRepository<Place>
  implements PlacesRepositoryInterface
{
  constructor(
    @InjectRepository(Place)
    private readonly placesRepository: Repository<Place>,
  ) {
    super(placesRepository);
  }
}
