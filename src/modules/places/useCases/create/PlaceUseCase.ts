import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import Place from "../../infra/typeorm/entities/Place";
import { AppError } from "../../../../shared/Error/AppError";
import { ICreatePlaceDTO } from "../../dto/ICreatePlaceDTO";
import { IPlaceRepository } from "../../repository/IPlacle";
import { formatGoalDate } from "../../../../shared/utils/formatGoal";

@injectable()
class PlaceUseCase {
  constructor(
    @inject("PlaceRepository")
    private placeRepository: IPlaceRepository
  ) {}

  async execute({
    id,
    goal,
    name,
    country_id,
  }: ICreatePlaceDTO): Promise<Place> {
    try {
      const placeExists = await this.placeRepository.findName(name);

      if (placeExists) {
        throw new AppError(
          "A place with the same name already exists in this country!"
        );
      }

      const formatDate = formatGoalDate(goal);

      const place = await this.placeRepository.create({
        country_id,
        name,
        goal: formatDate,
      });

      return place;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { PlaceUseCase };
