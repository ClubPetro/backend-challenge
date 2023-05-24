import { container } from "tsyringe";
import { IPlaceRepository } from "../../modules/Place/interface/IPlaceRepository";
import { PlaceRepository } from "../../modules/Place/repository/PlaceRepository";

container.registerSingleton<IPlaceRepository>(
  'PlaceRepository',
  PlaceRepository
)