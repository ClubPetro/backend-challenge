import { ListPlaceByGoalUseCase } from "./ListPlaceByGoalUseCase";
import { AppError } from "../../../../shared/Error/AppError";
import { CreatePlaceRepositoryInMemory } from "../../repository/inMemory/CreatePlaceRepositoryInMemory";

let listPlaceByGoalUseCase: ListPlaceByGoalUseCase;
let createPlaceRepositoryInMemory: CreatePlaceRepositoryInMemory;

describe("Unit test list all Goal", () => {
  beforeEach(() => {
    createPlaceRepositoryInMemory = new CreatePlaceRepositoryInMemory();
    listPlaceByGoalUseCase = new ListPlaceByGoalUseCase(
      createPlaceRepositoryInMemory
    );
  });

  it("should be to ASCENDING ORDER", async () => {
    const place1 = {
      name: "place's test",
      goal: "02/2024",
      country_id: "123456798",
    };
    const place2 = {
      name: "place's test",
      goal: "06/2024",
      country_id: "123456",
    };
    const place3 = {
      name: "place's test",
      goal: "10/2024",
      country_id: "123456",
    };

    const placeCreated = await createPlaceRepositoryInMemory.create(place1);
    const placeCreated2 = await createPlaceRepositoryInMemory.create(place2);
    const placeCreated3 = await createPlaceRepositoryInMemory.create(place3);

    const places = await listPlaceByGoalUseCase.execute();

    expect(places).toEqual([placeCreated, placeCreated2, placeCreated3]);
  });
});
