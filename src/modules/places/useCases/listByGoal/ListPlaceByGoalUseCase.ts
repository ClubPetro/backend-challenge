import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import Place from "../../infra/typeorm/entities/Place";
import { IPlaceRepository } from "../../repository/IPlacle";

@injectable()
class ListPlaceByGoalUseCase {
  constructor(
    @inject("listPlaceRepository")
    private placeRepository: IPlaceRepository
  ) {}

  async execute(): Promise<Place[]> {
    return await this.placeRepository.findAll();
  }
}
export { ListPlaceByGoalUseCase };
