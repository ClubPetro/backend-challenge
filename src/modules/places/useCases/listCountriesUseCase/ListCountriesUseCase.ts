import { ICountryDataDTO } from "modules/places/dtos/ICountryDataDTO";
import { ICountryCodeRepository } from "modules/places/repositories/ICountryCodeRepository";

class ListCountriesUseCase {
  constructor(private countryRepository: ICountryCodeRepository) {}

  async execute(): Promise<ICountryDataDTO[]> {
    const countries = await this.countryRepository.listAvailableCountries();
    return countries;
  }
}

export { ListCountriesUseCase };
