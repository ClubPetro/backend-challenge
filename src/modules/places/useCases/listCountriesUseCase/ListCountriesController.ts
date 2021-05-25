import { Request, Response } from "express";

import { CountryCodeRepository } from "../../repositories/implementations/CountryCodeRepository";
import { ListCountriesUseCase } from "./ListCountriesUseCase";

class ListCountriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const countriesCodeRepository = new CountryCodeRepository();
    const listCountriesUseCase = new ListCountriesUseCase(
      countriesCodeRepository
    );

    const contries = await listCountriesUseCase.execute();

    return response.json(contries);
  }
}

export { ListCountriesController };
