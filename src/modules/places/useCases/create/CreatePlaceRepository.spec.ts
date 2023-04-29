import { PlaceUseCase } from "./PlaceUseCase";
import { AppError } from "../../../../shared/Error/AppError";
import { CreatePlaceRepositoryInMemory } from "../../repository/inMemory/CreatePlaceRepositoryInMemory";

let createPlace: PlaceUseCase;
let createPlaceRepositoryInMemory: CreatePlaceRepositoryInMemory;

describe("Unit test create Place", () => {
  beforeEach(() => {
    createPlaceRepositoryInMemory = new CreatePlaceRepositoryInMemory();
    createPlace = new PlaceUseCase(createPlaceRepositoryInMemory);
  });

  it("should be to create a new Place", async () => {
    const place = {
      name: "place's test",
      goal: "02/2024",
      country_id: "123456798",
    };

    await createPlace.execute({
      name: place.name,
      goal: place.goal,
      country_id: place.country_id,
    });

    const placeCreated = await createPlaceRepositoryInMemory.findName(
      place.name
    );

    expect(placeCreated).toHaveProperty("id");
  });

  it("should not be to create a place with the same name already exists in this country", async () => {
    expect(async () => {
      const place = {
        name: "place's test",
        goal: "02/2024",
        country_id: "123456798",
      };

      await createPlace.execute({
        name: place.name,
        goal: place.goal,
        country_id: place.country_id,
      });
      await createPlace.execute({
        name: place.name,
        goal: place.goal,
        country_id: place.country_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
