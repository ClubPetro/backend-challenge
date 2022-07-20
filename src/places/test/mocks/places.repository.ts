import { PlacesRepository } from '@/places/data';
import { PlaceSchema } from '@/places/domain';

export class PlacesRepositorySpy implements PlacesRepository {
  async create(place: PlaceSchema): Promise<PlaceSchema> {
    return;
  }

  async delete(place: PlaceSchema): Promise<boolean> {
    return true;
  }

  async findAll(): Promise<PlaceSchema[]> {
    return [];
  }

  async findByContryAndLocal(
    country: string,
    local: string,
  ): Promise<PlaceSchema> {
    return;
  }

  async findById(id: number): Promise<PlaceSchema> {
    return;
  }

  async update(place: PlaceSchema): Promise<boolean> {
    return true;
  }
}
