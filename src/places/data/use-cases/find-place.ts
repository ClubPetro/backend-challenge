import { PlaceNotFoundError, PlacesRepository } from '@/places/data';
import { Place } from '@/places/domain';

export class FindPlace {
  constructor(private readonly placesRepository: PlacesRepository) {}

  async execute(id: number): Promise<Place> {
    const place = await this.placesRepository.findById(id);
    if (!place) throw new PlaceNotFoundError();

    return new Place({
      id: place.id,
      country: place.country,
      local: place.local,
      flagUrl: place.flagUrl,
      expectedVisitAt: place.expectedVisitAt,
    });
  }
}
