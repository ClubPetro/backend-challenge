import { EntityGone } from '@core/exception/exception.types';
import { generateString, generateDate } from '@core/utils/data.generate';

import { FakePlacesRepository } from '../repositories/fake-places.repository';

import { PlaceGoneService } from './place-gone.service';

import { Place } from '../infra/nest/typeorm/entities/place.entity';

let placeGoneService: PlaceGoneService;
let fakePlacesRepository: FakePlacesRepository;

describe('Place gone', () => {
  beforeAll(() => {
    fakePlacesRepository = new FakePlacesRepository();
    placeGoneService = new PlaceGoneService(fakePlacesRepository);
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

  it('should be able to throw EntityGone if place dont exists', async () => {
    await expect(placeGoneService.execute('test')).rejects.toBeInstanceOf(
      EntityGone,
    );
  });

  it('should not be able to throw EntityGone if place exists', async () => {
    await expect(placeGoneService.execute(place.id)).resolves.toBeUndefined();
  });

  it('should not be able to throw EntityGone if some error occur', async () => {
    const spyFindOneById = jest
      .spyOn(fakePlacesRepository, 'findOneById')
      .mockImplementationOnce(() => {
        throw new Error('some error');
      });
    await expect(placeGoneService.execute(place.id)).rejects.toThrow(
      'some error',
    );
    expect(spyFindOneById).toHaveBeenCalledWith(place.id);
  });
});
