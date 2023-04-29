import { AppError } from "../../../../shared/Error/AppError";
import { CreatePlaceRepositoryInMemory } from "../../repository/inMemory/CreatePlaceRepositoryInMemory";
import { UpdatePlaceUseCase } from "./UpdatePlaceUseCase";

let upadatePlaceUseCase: UpdatePlaceUseCase;
let createPlaceRespository: CreatePlaceRepositoryInMemory;

describe("Unit test Update Place", () => {
  beforeEach(() => {
    createPlaceRespository = new CreatePlaceRepositoryInMemory();
    upadatePlaceUseCase = new UpdatePlaceUseCase(createPlaceRespository);
  });

  it("Should able update a place or goal ", async () => {
    const place = {
      name: "place's test",
      goal: "02/2024",
      country_id: "123456798",
    };
    await createPlaceRespository.create({
      name: place.name,
      goal: place.goal,
      country_id: place.country_id,
    });

    const updatedPlaceData = {
      name: "new place name",
      goal: "03/2025",
    };

    const placeUpdated = await upadatePlaceUseCase.execute({
      name: updatedPlaceData.name,
      goal: updatedPlaceData.goal,
    });

    const updatedPlace = await createPlaceRespository.findById(placeUpdated.id);

    expect(updatedPlace.name).toBe(updatedPlaceData.name);
    expect(updatedPlace.goal).toBe(updatedPlaceData.goal);
  });

  it("Should throw an error if place does not exist", async () => {
    try {
      await upadatePlaceUseCase.execute({
        id: "non-existing-id",
        name: "new name",
        goal: "01/2025",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
