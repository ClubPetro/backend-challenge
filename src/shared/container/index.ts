import { container } from "tsyringe";

import { PlacesRepository } from "../../modules/places/repositories/implementations/PlacesRepository";
import { IPlacesRepository } from "../../modules/places/repositories/IPlacesRepository";

container.registerSingleton<IPlacesRepository>(
  "PlacesRepository",
  PlacesRepository
);
