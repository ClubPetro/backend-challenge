import { EntityDuplicated } from '@core/exception/exception.types';
import { generateString, generateDate } from '@core/utils/data.generate';

import { FakePlacesRepository } from '../repositories/fake-places.repository';

import { PlaceDuplicatedService } from './place-duplicated.service';

import { Place } from '../infra/nest/typeorm/entities/place.entity';

let placeDuplicatedService: PlaceDuplicatedService;
let fakePlacesRepository: FakePlacesRepository;

describe('Place duplicated', () => {
  beforeAll(() => {
    fakePlacesRepository = new FakePlacesRepository();
    placeDuplicatedService = new PlaceDuplicatedService(fakePlacesRepository);
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

  describe('Throw EntityDuplicated', () => {
    it('should be able to throw EntityDuplicated if place exists with same location and country', async () => {
      await expect(
        placeDuplicatedService.execute({
          location: place.location,
          country: place.country,
        }),
      ).rejects.toBeInstanceOf(EntityDuplicated);
    });

    it('should be able to throw EntityDuplicated if place exists with same location and id', async () => {
      await expect(
        placeDuplicatedService.execute({
          location: place.location,
          id: place.id,
        }),
      ).rejects.toBeInstanceOf(EntityDuplicated);
    });
  });

  describe('Not throw EntityDuplicated', () => {
    it('with location and country', async () => {
      await expect(
        placeDuplicatedService.execute({
          location: 'test2',
          country: place.country,
        }),
      ).resolves.toBeUndefined();
    });

    it('with location and id', async () => {
      await expect(
        placeDuplicatedService.execute({
          location: 'test2',
          id: place.id,
        }),
      ).resolves.toBeUndefined();
    });
  });

  describe('should not be able to execute', () => {
    let spyFindByCondition;
    beforeEach(() => {
      spyFindByCondition = jest
        .spyOn(fakePlacesRepository, 'findByCondition')
        .mockImplementationOnce(() => {
          throw new Error('some error');
        });
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('with location and country', async () => {
      await expect(
        placeDuplicatedService.execute({
          location: place.location,
          country: place.country,
        }),
      ).rejects.toThrow('some error');
      expect(spyFindByCondition).toHaveBeenCalledWith({
        location: place.location,
        country: place.country,
      });
    });

    it('with location and id', async () => {
      await expect(
        placeDuplicatedService.execute({
          location: 'test2',
          id: place.id,
        }),
      ).rejects.toThrow('some error');
      expect(spyFindByCondition).toHaveBeenCalledWith({
        location: 'test2',
        country: place.country,
      });
      const spyFindOneById = jest
        .spyOn(fakePlacesRepository, 'findOneById')
        .mockImplementationOnce(() => {
          throw new Error('some error in find by id');
        });
      await expect(
        placeDuplicatedService.execute({
          location: 'test2',
          id: place.id,
        }),
      ).rejects.toThrow('some error in find by id');
      expect(spyFindOneById).toHaveBeenCalledWith(place.id);
    });
  });
});
