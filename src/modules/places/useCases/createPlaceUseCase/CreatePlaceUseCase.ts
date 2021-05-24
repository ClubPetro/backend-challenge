import { inject, injectable } from "tsyringe";

import { ICreatePlaceDTO } from "../../dtos/ICreatePlaceDTO";
import { Place } from "../../entities/Places";
import { IPlacesRepository } from "../../repositories/IPlacesRepository";

@injectable()
class CreatePlaceUseCase {
  constructor(
    @inject("PlacesRepository")
    private placesRepository: IPlacesRepository
  ) {}

  async execute({ name, country, goal }: ICreatePlaceDTO): Promise<Place> {
    const namesInCountry = await this.placesRepository.findByCountry(country);
    const isNameInCountry = namesInCountry.find((place) => place.name === name);

    if (isNameInCountry) {
      throw new Error("This name is already in use for this country");
    }
    const place = await this.placesRepository.create({
      name,
      country,
      goal,
    });

    return place;
  }
}

export { CreatePlaceUseCase };
