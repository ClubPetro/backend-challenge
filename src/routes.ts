import { Router } from "express";

import { CreatePlaceController } from "./modules/places/useCases/createPlaceUseCase/CreatePlaceController";
import { ListPlacesController } from "./modules/places/useCases/listPlacesUseCase/ListPlacesController";
import { UpdateNameController } from "./modules/places/useCases/UpdateNameUseCase/updateNameController";

const routes = Router();

const createPlaceController = new CreatePlaceController();
const listPlaceController = new ListPlacesController();
const updateNameController = new UpdateNameController();

routes.post("/places", createPlaceController.handle);
routes.get("/places", listPlaceController.handle);
routes.patch("/places/:id", updateNameController.handle);

export { routes };
