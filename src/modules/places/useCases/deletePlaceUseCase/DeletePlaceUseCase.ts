import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IPlacesRepository } from "../../repositories/IPlacesRepository";

@injectable()
class DeletePlaceUseCase {
  constructor(
    @inject("PlacesRepository")
    private placesRepository: IPlacesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const place = await this.placesRepository.findById(id);

    if (!place) {
      throw new AppError("Place not found", 404);
    }

    await this.placesRepository.remove(id);
  }
}

export { DeletePlaceUseCase };
