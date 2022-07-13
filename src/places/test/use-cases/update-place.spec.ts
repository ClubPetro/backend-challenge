import {
  UpdatePlace,
  UpdatePlaceError,
  PlaceAlreadyExistsError,
  PlaceNotFoundError,
  PlacesRepository,
} from '@/places/data';

import { PlaceBuilder } from '../builders';
import { PlacesRepositorySpy } from '../mocks';

type SutTypes = {
  sut: UpdatePlace;
  placesRepositorySpy: PlacesRepository;
};

const makeSut = (): SutTypes => {
  const placesRepositorySpy = new PlacesRepositorySpy();

  const sut = new UpdatePlace(placesRepositorySpy);
  return {
    sut,
    placesRepositorySpy,
  };
};

describe('Places: update place use case', () => {
  it('should be able to update a place with valid data', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const payload: UpdatePlace.Data = {
      local: 'Fortaleza',
      expectedVisitAt: new Date('2022-11-16 00:00:00.000'),
    };

    const place = PlaceBuilder.create().build();

    jest
      .spyOn(placesRepositorySpy, 'findById')
      .mockImplementationOnce(async () => place);

    const response = await sut.execute(place.id, payload);

    expect(response).toBe(true);
  });

  it('should not be able to update a place if place not exists', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const payload: UpdatePlace.Data = {
      local: 'Fortaleza',
      expectedVisitAt: new Date('2022-11-16 00:00:00.000'),
    };

    const place = PlaceBuilder.create().build();

    jest
      .spyOn(placesRepositorySpy, 'findById')
      .mockImplementationOnce(async () => null);

    await expect(sut.execute(place.id, payload)).rejects.toThrow(
      PlaceNotFoundError,
    );
  });

  it('should not be able to update a place if local already exists', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const payload: UpdatePlace.Data = {
      local: 'Fortaleza',
      expectedVisitAt: new Date('2022-11-16 00:00:00.000'),
    };

    const place1 = PlaceBuilder.create(
      'Brasil',
      'Florianópolis',
      new Date('2022-11-16 00:00:00.000'),
      'http://test.com',
      1,
    ).build();

    const place2 = PlaceBuilder.create(
      'Brasil',
      'Fortaleza',
      new Date('2022-11-16 00:00:00.000'),
      'http://test.com',
      3,
    ).build();

    jest
      .spyOn(placesRepositorySpy, 'findById')
      .mockImplementationOnce(async () => place1);

    jest
      .spyOn(placesRepositorySpy, 'findByContryAndLocal')
      .mockImplementationOnce(async () => place2);

    await expect(sut.execute(1, payload)).rejects.toThrow(
      PlaceAlreadyExistsError,
    );
  });

  it('should not be able to delete a place if not update a place in the repository', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const payload: UpdatePlace.Data = {
      local: 'Fortaleza',
      expectedVisitAt: new Date('2022-11-16 00:00:00.000'),
    };

    const place = PlaceBuilder.create().build();

    jest
      .spyOn(placesRepositorySpy, 'findById')
      .mockImplementationOnce(async () => place);

    jest
      .spyOn(placesRepositorySpy, 'update')
      .mockImplementationOnce(async () => null);

    await expect(sut.execute(1, payload)).rejects.toThrow(UpdatePlaceError);
  });
});
