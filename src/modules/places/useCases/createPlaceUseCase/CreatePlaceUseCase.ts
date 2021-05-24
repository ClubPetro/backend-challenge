import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
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
    const isNameInUseInCountry = await this.placesRepository.findByCountry(
      country,
      name
    );

    if (isNameInUseInCountry) {
      throw new AppError("Place name already in use in that country.");
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
