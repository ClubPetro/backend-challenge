import { generateString, generateDate } from '@core/utils/data.generate';

import { FakePlacesRepository } from '../repositories/fake-places.repository';

import { UpdatePartialPlaceService } from './update-partial-place.service';

import { Place } from '../infra/nest/typeorm/entities/place.entity';

let updatePartialPlaceService: UpdatePartialPlaceService;
let fakePlacesRepository: FakePlacesRepository;
describe('Create places', () => {
  beforeAll(() => {
    fakePlacesRepository = new FakePlacesRepository();
    updatePartialPlaceService = new UpdatePartialPlaceService(
      fakePlacesRepository,
    );
  });

  let place: Place;

  beforeEach(async () => {
    place = await fakePlacesRepository.create({
      country: generateString(5),
      location: generateString(5),
      goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
      imageUrl: `http://${generateString(5)}.com.br`,
    });
  });

  it('should be able to update place', async () => {
    const updatePlace = {
      id: place.id,
      location: generateString(5),
      goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
    };
    await updatePartialPlaceService.execute(updatePlace);
    const test = await fakePlacesRepository.findOneById(place.id);
    expect(test).toMatchObject({
      id: place.id,
      country: place.country,
      location: updatePlace.location,
      goal: updatePlace.goal,
      imageUrl: place.imageUrl,
    });
    expect(test.updatedAt.getTime()).toBeGreaterThanOrEqual(
      place.updatedAt.getTime(),
    );
  });

  it('should not be able to update place', async () => {
    const updatePlace = {
      id: 'test',
      location: generateString(5),
      goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
    };
    const result = await updatePartialPlaceService.execute(updatePlace);
    const test = await fakePlacesRepository.findOneById(place.id);
    expect(test).toMatchObject(place);
    expect(result).toBeUndefined();
  });
});
