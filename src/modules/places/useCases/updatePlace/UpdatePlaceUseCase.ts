import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import Place from "../../infra/typeorm/entities/Place";
import { AppError } from "../../../../shared/Error/AppError";
import { ICreatePlaceDTO } from "../../../places/dto/ICreatePlaceDTO";
import { IPlaceRepository } from "../../../places/repository/IPlacle";
import { formatGoalDate } from "../../../../shared/utils/formatGoal";

@injectable()
class UpdatePlaceUseCase {
  constructor(
    @inject("UpdateRepository")
    private placeRepository: IPlaceRepository
  ) {}

  async execute({ id, name, goal }: ICreatePlaceDTO): Promise<Place> {
    try {
      const place = await this.placeRepository.findById(id);

      if (!place) {
        throw new AppError("Place not found!");
      }

      const formatDate = formatGoalDate(goal);

      const update = await this.placeRepository.update({
        id,
        name,
        goal: formatDate,
      });

      return update;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
export { UpdatePlaceUseCase };
