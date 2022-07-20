import { format } from 'date-fns';

import {
  CreatePlace,
  CreatePlaceError,
  PlaceAlreadyExistsError,
  PlacesRepository,
} from '@/places/data';

import { PlaceBuilder } from '../builders';
import { PlacesRepositorySpy } from '../mocks';

type SutTypes = {
  sut: CreatePlace;
  placesRepositorySpy: PlacesRepository;
};

const makeSut = (): SutTypes => {
  const placesRepositorySpy = new PlacesRepositorySpy();

  const sut = new CreatePlace(placesRepositorySpy);
  return {
    sut,
    placesRepositorySpy,
  };
};

describe('Places: create place use case', () => {
  it('should be able to create a place with valid data', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const payload: CreatePlace.Data = {
      country: 'Brasil',
      local: 'Florianópolis',
      expectedVisitAt: new Date('2022-11-15 00:00:00.000'),
      flagUrl: 'http://test.com',
    };

    const place = PlaceBuilder.create(
      payload.country,
      payload.local,
      payload.expectedVisitAt,
      payload.flagUrl,
    ).build();

    jest
      .spyOn(placesRepositorySpy, 'create')
      .mockImplementationOnce(async () => place);

    const response = await sut.execute(payload);

    expect(response).toHaveProperty('id');
    expect(response.country).toBe('Brasil');
    expect(response.local).toBe('Florianópolis');
    expect(response.expectedVisitAt).toBe(
      format(new Date('2022-11-15 00:00:00.000'), 'MM/yyyy'),
    );
    expect(response.flagUrl).toBe('http://test.com');
  });

  it('should not be able to create a place if already exist place', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const payload: CreatePlace.Data = {
      country: 'Brasil',
      local: 'Florianópolis',
      expectedVisitAt: new Date('2022-11-15 00:00:00.000'),
      flagUrl: 'http://test.com',
    };

    const place = PlaceBuilder.create(
      payload.country,
      payload.local,
      payload.expectedVisitAt,
      payload.flagUrl,
    ).build();

    jest
      .spyOn(placesRepositorySpy, 'findByContryAndLocal')
      .mockImplementationOnce(async () => place);

    await expect(sut.execute(payload)).rejects.toThrow(PlaceAlreadyExistsError);
  });

  it('should not be able to create a place if not create a place in the repository', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const payload: CreatePlace.Data = {
      country: 'Brasil',
      local: 'Florianópolis',
      expectedVisitAt: new Date('2022-11-15 00:00:00.000'),
      flagUrl: 'http://test.com',
    };

    jest
      .spyOn(placesRepositorySpy, 'create')
      .mockImplementationOnce(async () => null);

    await expect(sut.execute(payload)).rejects.toThrow(CreatePlaceError);
  });
});
