import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import Country from "../infra/typeorm/entities/Country";
import { AppError } from "../../../shared/Error/AppError";
import { ICreateCountryDTO } from "../dto/ICreateCountryDto";
import { ICountryRepository } from "../repository/ICountry";

@injectable()
class CreateCountryUseCase {
  constructor(
    @inject("CountryRepository")
    private countryRepository: ICountryRepository
  ) {}

  async execute({ id, name, flag_url }: ICreateCountryDTO): Promise<Country> {
    const countryExists = await this.countryRepository.findByName(name);

    if (countryExists) {
      throw new AppError("Country already exists!");
    }

    const country = await this.countryRepository.create({
      id,
      name,
      flag_url,
    });

    return country;
  }
}

export default CreateCountryUseCase;
