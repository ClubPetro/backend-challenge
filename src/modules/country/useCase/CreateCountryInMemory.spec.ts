import CreateCountryUseCase from "./CreateCountryUseCase";
import { AppError } from "../../../shared/Error/AppError";
import { CreateCountryRepositoryInMemory } from "../repository/inMemory/CreateCountryInMemory";

let createCountry: CreateCountryUseCase;
let createCountryRepositoryInMemory: CreateCountryRepositoryInMemory;

describe("Unit test create Country", () => {
  beforeEach(() => {
    createCountryRepositoryInMemory = new CreateCountryRepositoryInMemory();
    createCountry = new CreateCountryUseCase(createCountryRepositoryInMemory);
  });

  it("should be to create a new country", async () => {
    const country = {
      name: "Country's test",
      flag_url: "http://exemple.flag.png",
    };
    await createCountry.execute({
      name: country.name,
      flag_url: country.flag_url,
    });

    const countryCreated = await createCountryRepositoryInMemory.findByName(
      country.name
    );

    expect(countryCreated).toHaveProperty("id");
  });

  it("should not be to create a new country with same name", async () => {
    expect(async () => {
      const country = {
        name: "country's test",
        flag_url: "http://exemple.flag.png",
      };
      await createCountry.execute({
        name: country.name,
        flag_url: country.flag_url,
      });
      await createCountry.execute({
        name: country.name,
        flag_url: country.flag_url,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
