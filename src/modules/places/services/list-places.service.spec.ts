import { generateString, generateDate } from '@core/utils/data.generate';
import { isSorted } from '@core/utils/data.validate';

import { FakePlacesRepository } from '../repositories/fake-places.repository';

import { ListPlacesService } from './list-places.service';

import { Place } from '../infra/nest/typeorm/entities/place.entity';

let listPlacesService: ListPlacesService;
let fakePlacesRepository: FakePlacesRepository;

describe('List places', () => {
  beforeAll(() => {
    fakePlacesRepository = new FakePlacesRepository();
    listPlacesService = new ListPlacesService(fakePlacesRepository);
  });

  let places: Place[];

  beforeEach(async () => {
    for (let i = 0; i < 20; i++) {
      try {
        const place = await fakePlacesRepository.create({
          country: generateString(5),
          location: generateString(5),
          goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
          imageUrl: `http://${generateString(5)}.com.br`,
        });
        places.push(place);
      } catch (error) {
        // do nothing
      }
    }
  });

  it('should be able to list places sorted', async () => {
    const test = await listPlacesService.execute();
    expect(isSorted(test, 'goal', 'ASC')).toBeTruthy();
  });

  it('should be able to list places sorted with another field', async () => {
    const test = await listPlacesService.execute({
      order: [
        {
          field: 'createdAt',
          order: 'DESC',
        },
      ],
    });
    expect(isSorted(test, 'goal', 'ASC')).toBeFalsy();
    expect(isSorted(test, 'createdAt', 'DESC')).toBeTruthy();
  });

  it('should not be able to list places', async () => {
    const spyFind = jest
      .spyOn(fakePlacesRepository, 'findAll')
      .mockImplementationOnce(() => {
        throw new Error('some error');
      });
    await expect(listPlacesService.execute()).rejects.toBeInstanceOf(Error);
    expect(spyFind).toHaveBeenCalledWith([
      {
        field: 'goal',
        order: 'ASC',
      },
    ]);
  });
});
