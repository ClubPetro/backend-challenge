import { ICountryDataDTO } from "../dtos/ICountryDataDTO";

interface ICountryCodeRepository {
  listAvailableCountries(): Promise<ICountryDataDTO[]>;
}

export { ICountryCodeRepository };
