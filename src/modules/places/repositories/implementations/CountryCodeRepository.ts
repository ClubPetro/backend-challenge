import axios, { AxiosInstance } from "axios";
import { ICountryDataDTO } from "modules/places/dtos/ICountryDataDTO";

import { ICountryCodeRepository } from "../ICountryCodeRepository";

class CountryCodeRepository implements ICountryCodeRepository {
  private repository: AxiosInstance;

  constructor() {
    this.repository = axios.create({
      baseURL: "http://countryapi.gear.host/v1/Country/getCountries",
    });
  }
  async listAvailableCountries(): Promise<ICountryDataDTO[]> {
    const { data } = await this.repository.get("/");
    const countries = data.Response.map((country): ICountryDataDTO => {
      return {
        name: country.Name,
        code: country.Alpha2Code,
      };
    });

    return countries;
  }
}

export { CountryCodeRepository };
