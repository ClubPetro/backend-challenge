import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Place } from "../../entities/Places";
import { IPlacesRepository } from "../../repositories/IPlacesRepository";

interface IRequest {
  id: string;
  name: string;
}

@injectable()
class UpdateNameUseCase {
  constructor(
    @inject("PlacesRepository")
    private placesRepository: IPlacesRepository
  ) {}

  async execute({ id, name }: IRequest): Promise<void> {
    const place = await this.placesRepository.findById(id);
    if (!place) {
      throw new AppError("Place not found", 404);
    }

    const isNameInUseInCountry = await this.placesRepository.findByCountry(
      place.country,
      name
    );
    if (isNameInUseInCountry) {
      throw new AppError("Place name already in use in that country.");
    }

    place.name = name;
    await this.placesRepository.create(place);
  }
}

export { UpdateNameUseCase };
