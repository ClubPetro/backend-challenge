import { generateString, generateDate } from '@core/utils/data.generate';

import { FakePlacesRepository } from '../repositories/fake-places.repository';

import { DeletePlaceService } from './delete-place.service';

import { Place } from '../infra/nest/typeorm/entities/place.entity';

let deletePlaceService: DeletePlaceService;
let fakePlacesRepository: FakePlacesRepository;
describe('Delete places', () => {
  beforeAll(() => {
    fakePlacesRepository = new FakePlacesRepository();
    deletePlaceService = new DeletePlaceService(fakePlacesRepository);
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

  it('should be able to delete a place', async () => {
    await deletePlaceService.execute(place.id);
    const test = await fakePlacesRepository.findOneById(place.id);
    expect(test).toBeUndefined();
  });

  it('should not be able to delete a place', async () => {
    jest.spyOn(fakePlacesRepository, 'remove').mockImplementationOnce(() => {
      throw new Error('some error');
    });
    await expect(deletePlaceService.execute(place.id)).rejects.toBeInstanceOf(
      Error,
    );
    const test = await fakePlacesRepository.findOneById(place.id);
    expect(test).toBeDefined();
  });
});
