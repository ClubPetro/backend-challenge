import { PlacesRepository } from '@/places/data';
import { PlaceSchema } from '@/places/domain';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class PostgresPlacesRepository implements PlacesRepository {
  constructor(
    @InjectRepository(PlaceSchema)
    private placesRepository: Repository<PlaceSchema>,
  ) {}

  async create(place: PlaceSchema): Promise<PlaceSchema> {
    return await this.placesRepository.save(place);
  }

  async delete(place: PlaceSchema): Promise<boolean> {
    return !!(await this.placesRepository.softRemove(place));
  }

  async findAll(): Promise<PlaceSchema[]> {
    return await this.placesRepository.find({
      order: { expectedVisitAt: 'ASC' },
    });
  }

  async findByContryAndLocal(
    country: string,
    local: string,
  ): Promise<PlaceSchema> {
    return await this.placesRepository.findOne({ where: { country, local } });
  }

  async findById(id: number): Promise<PlaceSchema> {
    return await this.placesRepository.findOne({ where: { id } });
  }

  async update(place: PlaceSchema): Promise<boolean> {
    return !!(await this.placesRepository.save(place));
  }
}
