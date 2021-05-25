import { inject, injectable } from "tsyringe";

import { Place } from "../../entities/Places";
import { IPlacesRepository } from "../../repositories/IPlacesRepository";

@injectable()
class ListPlacesUseCase {
  constructor(
    @inject("PlacesRepository")
    private placesReposioty: IPlacesRepository
  ) {}

  async execute(): Promise<Place[]> {
    const places = await this.placesReposioty.listByGoal();
    return places;
  }
}

export { ListPlacesUseCase };
