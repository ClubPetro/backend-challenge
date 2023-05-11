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
    const place = await createPlaceRespository.create({
      name: "new place name",
      goal: "03/2025",
      country_id: "123456",
    });
    console.log("Place", place);
    const updatedPlace = await upadatePlaceUseCase.execute({
      id: place.id,
      name: "Update New Place",
      goal: "01/10/2025",
    });
    console.log("UpdatePlace", updatedPlace);
    expect(updatedPlace.name).toBe("Update New Place");
    expect(updatedPlace.goal).toBe("10/2025");
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
