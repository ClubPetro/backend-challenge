import { generateString, generateDate } from '@core/utils/data.generate';

import { FakePlacesRepository } from '../repositories/fake-places.repository';

import { CreatePlaceService } from './create-place.service';

let createPlaceService: CreatePlaceService;
let fakePlacesRepository: FakePlacesRepository;
describe('Create places', () => {
  beforeAll(() => {
    fakePlacesRepository = new FakePlacesRepository();
    createPlaceService = new CreatePlaceService(fakePlacesRepository);
  });

  it('should be able to create new place', async () => {
    const place = await createPlaceService.execute({
      country: generateString(5),
      location: generateString(5),
      goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
      imageUrl: `http://${generateString(5)}.com.br`,
    });
    const test = await fakePlacesRepository.findOneById(place.id);
    expect(test).toBeDefined();
  });

  it('should not be able to create new place', async () => {
    jest.spyOn(fakePlacesRepository, 'create').mockImplementationOnce(() => {
      throw new Error('some error');
    });
    await expect(
      createPlaceService.execute({
        country: generateString(5),
        location: generateString(5),
        goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
        imageUrl: `http://${generateString(5)}.com.br`,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
