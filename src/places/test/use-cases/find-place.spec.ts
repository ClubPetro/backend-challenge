import { format } from 'date-fns';

import { FindPlace, PlaceNotFoundError, PlacesRepository } from '@/places/data';

import { PlaceBuilder } from '../builders';
import { PlacesRepositorySpy } from '../mocks';

type SutTypes = {
  sut: FindPlace;
  placesRepositorySpy: PlacesRepository;
};

const makeSut = (): SutTypes => {
  const placesRepositorySpy = new PlacesRepositorySpy();

  const sut = new FindPlace(placesRepositorySpy);
  return {
    sut,
    placesRepositorySpy,
  };
};

describe('Places: find place use case', () => {
  it('should be able to find a place with valid data', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const place = PlaceBuilder.create().build();

    jest
      .spyOn(placesRepositorySpy, 'findById')
      .mockImplementationOnce(async () => place);

    const response = await sut.execute(place.id);

    expect(response).toHaveProperty('id');
    expect(response.country).toBe('Brasil');
    expect(response.local).toBe('Florianópolis');
    expect(response.expectedVisitAt).toBe(
      format(new Date('2022-11-15 00:00:00.000'), 'MM/yyyy'),
    );
    expect(response.flagUrl).toBe('http://test.com');
  });

  it('should not be able to find a place if place not exists', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const place = PlaceBuilder.create().build();

    jest
      .spyOn(placesRepositorySpy, 'findById')
      .mockImplementationOnce(async () => null);

    await expect(sut.execute(place.id)).rejects.toThrow(PlaceNotFoundError);
  });
});
