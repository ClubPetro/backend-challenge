import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreatePlaceDTO } from "../../dtos/ICreatePlaceDTO";
import { Place } from "../../entities/Places";
import { ICountryCodeRepository } from "../../repositories/ICountryCodeRepository";
import { CountryCodeRepository } from "../../repositories/implementations/CountryCodeRepository";
import { IPlacesRepository } from "../../repositories/IPlacesRepository";

@injectable()
class CreatePlaceUseCase {
  private countryRepository: ICountryCodeRepository;
  constructor(
    @inject("PlacesRepository")
    private placesRepository: IPlacesRepository
  ) {
    this.countryRepository = new CountryCodeRepository();
  }

  async execute({ name, country, goal }: ICreatePlaceDTO): Promise<Place> {
    const isNameInUseInCountry = await this.placesRepository.findByCountry(
      country.name,
      name
    );

    if (isNameInUseInCountry) {
      throw new AppError("Place name already in use in that country.");
    }

    const url_flag = `https://flagcdn.com/h240/${country.code.toLowerCase()}.png`;

    const place = await this.placesRepository.create({
      name,
      country,
      goal,
      url_flag,
    });

    return place;
  }
}

export { CreatePlaceUseCase };
