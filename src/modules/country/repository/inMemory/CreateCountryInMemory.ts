import { ICreateCountryDTO } from "../../dto/ICreateCountryDto";
import Country from "../../infra/typeorm/entities/Country";
import { ICountryRepository } from "../ICountry";

class CreateCountryRepositoryInMemory implements ICountryRepository {
  private countryRepository: Country[] = [];

  async create({ name, flag_url }: ICreateCountryDTO): Promise<Country> {
    const country = new Country();

    Object.assign(country, {
      name,
      flag_url,
    });

    this.countryRepository.push(country);
    return country;
  }

  async findByName(name: string): Promise<Country> {
    const country = this.countryRepository.find((find) => find.name === name);

    return country;
  }
}

export { CreateCountryRepositoryInMemory };
