import {
  DeletePlaceError,
  PlaceNotFoundError,
  PlacesRepository,
} from '@/places/data';

export class DeletePlace {
  constructor(private readonly placesRepository: PlacesRepository) {}

  async execute(id: number): Promise<boolean> {
    const place = await this.placesRepository.findById(id);
    if (!place) throw new PlaceNotFoundError();

    const deleted = await this.placesRepository.delete(place);
    if (!deleted) throw new DeletePlaceError();

    return deleted;
  }
}
