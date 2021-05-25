import { Router } from "express";

import { CreatePlaceController } from "./modules/places/useCases/createPlaceUseCase/CreatePlaceController";
import { DeletePlaceController } from "./modules/places/useCases/deletePlaceUseCase/DeletePlaceController";
import { ListCountriesController } from "./modules/places/useCases/listCountriesUseCase/ListCountriesController";
import { ListPlacesController } from "./modules/places/useCases/listPlacesUseCase/ListPlacesController";
import { UpdateGoalController } from "./modules/places/useCases/updateGoalUseCase/UpdateGoalController";
import { UpdateNameController } from "./modules/places/useCases/updateNameUseCase/UpdateNameController";

const routes = Router();

const createPlaceController = new CreatePlaceController();
const listPlaceController = new ListPlacesController();
const updateNameController = new UpdateNameController();
const updateGoalController = new UpdateGoalController();
const deletePlacesController = new DeletePlaceController();

const listCountriesController = new ListCountriesController();

routes.post("/places", createPlaceController.handle);
routes.get("/places", listPlaceController.handle);
routes.patch("/places/name/:id", updateNameController.handle);
routes.patch("/places/goal/:id", updateGoalController.handle);
routes.delete("/places/:id", deletePlacesController.handle);

routes.get("/countries", listCountriesController.handle);

export { routes };
