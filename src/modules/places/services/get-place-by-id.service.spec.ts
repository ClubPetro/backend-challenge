import { generateString, generateDate } from '@core/utils/data.generate';

import { FakePlacesRepository } from '../repositories/fake-places.repository';

import { GetPlaceByIdService } from './get-place-by-id.service';

import { Place } from '../infra/nest/typeorm/entities/place.entity';

let getPlaceByIdService: GetPlaceByIdService;
let fakePlacesRepository: FakePlacesRepository;

describe('Get place by id', () => {
  beforeAll(() => {
    fakePlacesRepository = new FakePlacesRepository();
    getPlaceByIdService = new GetPlaceByIdService(fakePlacesRepository);
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

  it('should be able to get place by id', async () => {
    const test = await getPlaceByIdService.execute(place.id);
    expect(test).toBeDefined();
  });

  it('should not be able to get place by id', async () => {
    jest
      .spyOn(fakePlacesRepository, 'findOneById')
      .mockImplementationOnce(() => {
        throw new Error('some error');
      });
    await expect(getPlaceByIdService.execute(place.id)).rejects.toBeInstanceOf(
      Error,
    );
  });
});
