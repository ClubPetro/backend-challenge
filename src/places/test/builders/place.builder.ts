import { PlaceSchema } from '@/places/domain';

export class PlaceBuilder {
  private place: PlaceSchema;
  constructor(
    local?: string,
    expectedVisitAt?: Date,
    id?: number,
    country?: string,
    flagUrl?: string,
  ) {
    const date = new Date();
    this.place = {
      id,
      country,
      local,
      createdAt: date,
      updatedAt: date,
      deletedAt: null,
      expectedVisitAt,
      flagUrl,
    } as PlaceSchema;
  }

  static create(
    country = 'Brasil',
    local = 'Florianópolis',
    expectedVisitAt = new Date('2022-11-15 00:00:00.000'),
    flagUrl = 'http://test.com',
    id = 1,
  ): PlaceBuilder {
    return new PlaceBuilder(local, expectedVisitAt, id, country, flagUrl);
  }

  static update(
    local = 'Florianópolis',
    expectedVisitAt = new Date('2022-11-15 00:00:00.000'),
    id = 1,
  ): PlaceBuilder {
    return new PlaceBuilder(local, expectedVisitAt, id);
  }

  build(): PlaceSchema {
    return this.place;
  }
}
