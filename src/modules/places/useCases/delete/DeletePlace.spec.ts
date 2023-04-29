import { DaletePlaceUseCase } from "./DaletePlaceUseCase";
import { AppError } from "../../../../shared/Error/AppError";
import { CreatePlaceRepositoryInMemory } from "../../repository/inMemory/CreatePlaceRepositoryInMemory";

let deletePlaceUseCase: DaletePlaceUseCase;
let createPlaceRepositoryInMemory: CreatePlaceRepositoryInMemory;

describe("Unit Test delete Place", () => {
  beforeEach(() => {
    createPlaceRepositoryInMemory = new CreatePlaceRepositoryInMemory();
    deletePlaceUseCase = new DaletePlaceUseCase(createPlaceRepositoryInMemory);
  });
  DaletePlaceUseCase;

  it("should be able to delete place", async () => {
    const data = {
      name: "place's test",
      goal: "02/2024",
      country_id: "123456798",
    };

    const place = await createPlaceRepositoryInMemory.create(data);

    const placeDeleted = await deletePlaceUseCase.execute(place.id);

    expect(placeDeleted).toBe(placeDeleted);
  });

  it("should not be able to delete a non-existing place", async () => {
    await expect(
      deletePlaceUseCase.execute("non-existing-id")
    ).rejects.toBeInstanceOf(AppError);
  });
});
