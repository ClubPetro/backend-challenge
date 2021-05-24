import { Router } from "express";

import { CreatePlaceController } from "./modules/places/useCases/createPlaceUseCase/CreatePlaceController";

const routes = Router();

const createPlaceController = new CreatePlaceController();

routes.post("/places", createPlaceController.handle);

export { routes };
