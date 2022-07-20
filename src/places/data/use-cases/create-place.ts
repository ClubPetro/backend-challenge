import { Place } from '@/places/domain';

import {
  CreatePlaceError,
  PlaceAlreadyExistsError,
  PlacesRepository,
} from '@/places/data';

export class CreatePlace {
  constructor(private readonly placesRepository: PlacesRepository) {}

  async execute(payload: CreatePlace.Data): Promise<Place> {
    await this.validate(payload.country, payload.local);

    const created = await this.placesRepository.create(payload);
    if (!created) throw new CreatePlaceError();

    return new Place({
      id: created.id,
      country: created.country,
      local: created.local,
      flagUrl: created.flagUrl,
      expectedVisitAt: new Date(created.expectedVisitAt),
    });
  }

  private async validate(country: string, local: string): Promise<void> {
    const placeExists = await this.placesRepository.findByContryAndLocal(
      country,
      local,
    );

    if (placeExists) throw new PlaceAlreadyExistsError();
  }
}

export namespace CreatePlace {
  export interface Data {
    country: string;
    local: string;
    expectedVisitAt: Date;
    flagUrl: string;
  }
}
