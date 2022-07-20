import { PlaceSchema } from '@/places/domain';

import { CreatePlace } from '@/places/data';

export interface PlacesRepository {
  create: (place: CreatePlace.Data) => Promise<PlaceSchema>;
  delete: (place: PlaceSchema) => Promise<boolean>;
  findAll: () => Promise<PlaceSchema[]>;
  findByContryAndLocal: (
    country: string,
    local: string,
  ) => Promise<PlaceSchema>;
  findById: (id: number) => Promise<PlaceSchema>;
  update: (place: PlaceSchema) => Promise<boolean>;
}
