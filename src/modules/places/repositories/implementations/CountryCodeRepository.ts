import axios, { AxiosInstance } from "axios";

import { ICountryCodeRepository } from "../ICountryCodeRepository";

class CountryCodeRepository implements ICountryCodeRepository {
  private repository: AxiosInstance;

  constructor() {
    this.repository = axios.create({
      baseURL: "http://countryapi.gear.host/v1/Country/getCountries",
    });
  }
  async findCodeByName(country_name: string): Promise<string> {
    const { data } = await this.repository.get("/", {
      params: { pName: country_name },
    });

    const { Alpha2Code } = data.Response[0];

    return Alpha2Code;
  }
}

export { CountryCodeRepository };
