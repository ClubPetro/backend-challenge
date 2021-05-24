import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IPlacesRepository } from "../../repositories/IPlacesRepository";

interface IRequest {
  id: string;
  goal: Date;
}

@injectable()
class UpdateGoalUseCase {
  constructor(
    @inject("PlacesRepository")
    private placesRepository: IPlacesRepository
  ) {}

  async execute({ id, goal }: IRequest): Promise<void> {
    const place = await this.placesRepository.findById(id);
    if (!place) {
      throw new AppError("Place not found", 404);
    }

    if (goal < place.created_at) {
      throw new AppError(
        "It's not able to set a Goal on na date before the created_at attribute"
      );
    }

    place.goal = goal;
    await this.placesRepository.create(place);
  }
}

export { UpdateGoalUseCase };