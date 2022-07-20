import {
  DeletePlace,
  DeletePlaceError,
  PlaceNotFoundError,
  PlacesRepository,
} from '@/places/data';

import { PlaceBuilder } from '../builders';
import { PlacesRepositorySpy } from '../mocks';

type SutTypes = {
  sut: DeletePlace;
  placesRepositorySpy: PlacesRepository;
};

const makeSut = (): SutTypes => {
  const placesRepositorySpy = new PlacesRepositorySpy();

  const sut = new DeletePlace(placesRepositorySpy);
  return {
    sut,
    placesRepositorySpy,
  };
};

describe('Places: delete place use case', () => {
  it('should be able to delete a place with valid data', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const place = PlaceBuilder.create().build();

    jest
      .spyOn(placesRepositorySpy, 'findById')
      .mockImplementationOnce(async () => place);

    const response = await sut.execute(place.id);

    expect(response).toBe(true);
  });

  it('should not be able to delete a place if place not exists', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const place = PlaceBuilder.create().build();

    jest
      .spyOn(placesRepositorySpy, 'findById')
      .mockImplementationOnce(async () => null);

    await expect(sut.execute(place.id)).rejects.toThrow(PlaceNotFoundError);
  });

  it('should not be able to delete a place if not update a place in the repository', async () => {
    const { sut, placesRepositorySpy } = makeSut();

    const place = PlaceBuilder.create().build();

    jest
      .spyOn(placesRepositorySpy, 'findById')
      .mockImplementationOnce(async () => place);

    jest
      .spyOn(placesRepositorySpy, 'delete')
      .mockImplementationOnce(async () => null);

    await expect(sut.execute(1)).rejects.toThrow(DeletePlaceError);
  });
});
