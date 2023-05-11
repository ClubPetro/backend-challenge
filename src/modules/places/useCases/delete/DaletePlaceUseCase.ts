import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import Place from "../../infra/typeorm/entities/Place";
import { AppError } from "../../../../shared/Error/AppError";
import { IPlaceRepository } from "../../repository/IPlacle";

@injectable()
class DaletePlaceUseCase {
  constructor(
    @inject("DeletePlaceRepository")
    private placeRepository: IPlaceRepository
  ) {}

  async execute(id: string): Promise<void> {
    try {
      const placeExists = await this.placeRepository.findById(id);

      if (!placeExists) {
        throw new AppError("place not found!");
      }

      await this.placeRepository.delete(id);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export { DaletePlaceUseCase };
