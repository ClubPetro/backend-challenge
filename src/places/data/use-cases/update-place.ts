import {
  PlaceAlreadyExistsError,
  PlaceNotFoundError,
  PlacesRepository,
  UpdatePlaceError,
} from '@/places/data';

export class UpdatePlace {
  constructor(private readonly placesRepository: PlacesRepository) {}

  async execute(id: number, payload: UpdatePlace.Data): Promise<boolean> {
    const place = await this.placesRepository.findById(id);
    if (!place) throw new PlaceNotFoundError();

    if (payload.local) await this.validate(id, place.country, payload.local);

    Object.assign(place, { ...payload });

    const updated = await this.placesRepository.update(place);
    if (!updated) throw new UpdatePlaceError();

    return updated;
  }

  private async validate(
    id: number,
    country: string,
    local: string,
  ): Promise<void> {
    const placeExists = await this.placesRepository.findByContryAndLocal(
      country,
      local,
    );

    if (placeExists && placeExists.id !== id)
      throw new PlaceAlreadyExistsError();
  }
}

export namespace UpdatePlace {
  export interface Data {
    local?: string;
    expectedVisitAt?: Date;
  }
}
