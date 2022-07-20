import { PlacesRepository } from '@/places/data';
import { Place } from '@/places/domain';

export class FindPlaces {
  constructor(private readonly placesRepository: PlacesRepository) {}

  async execute(): Promise<Place[]> {
    const places = await this.placesRepository.findAll();
    return places.map(
      (place) =>
        new Place({
          id: place.id,
          country: place.country,
          local: place.local,
          flagUrl: place.flagUrl,
          expectedVisitAt: place.expectedVisitAt,
        }),
    );
  }
}
