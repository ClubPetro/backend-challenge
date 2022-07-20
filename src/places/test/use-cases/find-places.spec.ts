import { format } from 'date-fns';

import { FindPlaces, PlacesRepository } from '@/places/data';

import { PlaceBuilder } from '../builders';
import { PlacesRepositorySpy } from '../mocks';

type SutTypes = {
  sut: FindPlaces;
  placesRepositorySpy: PlacesRepository;
};

const makeSut = (): SutTypes => {
  const placesRepositorySpy = new PlacesRepositorySpy();

  const sut = new FindPlaces(placesRepositorySpy);
  return {
    sut,
    placesRepositorySpy,
  };
};

describe('Places: find places use case', () => {
  it('should be able to find places with valid data', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const place = PlaceBuilder.create().build();

    jest
      .spyOn(placesRepositorySpy, 'findAll')
      .mockImplementationOnce(async () => [place]);

    const response = await sut.execute();

    expect(response.length).toBe(1);
    expect(response[0].id).toBe(1);
    expect(response[0].country).toBe('Brasil');
    expect(response[0].local).toBe('Florianópolis');
    expect(response[0].expectedVisitAt).toBe(
      format(new Date('2022-11-15 00:00:00.000'), 'MM/yyyy'),
    );
    expect(response[0].flagUrl).toBe('http://test.com');
  });

  it('should be able to find places with empty data', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    jest
      .spyOn(placesRepositorySpy, 'findAll')
      .mockImplementationOnce(async () => []);

    const response = await sut.execute();

    expect(response.length).toBe(0);
  });
});
