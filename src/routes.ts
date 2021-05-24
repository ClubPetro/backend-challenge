import { Router } from "express";

import { CreatePlaceController } from "./modules/places/useCases/createPlaceUseCase/CreatePlaceController";
import { ListPlacesController } from "./modules/places/useCases/listPlacesUseCase/ListPlacesController";

const routes = Router();

const createPlaceController = new CreatePlaceController();
const listPlaceController = new ListPlacesController();

routes.post("/places", createPlaceController.handle);
routes.get("/places", listPlaceController.handle);

export { routes };
