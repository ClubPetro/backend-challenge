import { Router } from "express";

import PlaceController from "../../../modules/places/useCases/create/PlaceController";
import ListPlaceByGoalController from "../../../modules/places/useCases/listByGoal/ListPlaceByGoalController";
import UpdatePlaceController from "../../../modules/places/useCases/updatePlace/UpdatePlaceController";
import { DeletePlaceController } from "../../../modules/places/useCases/delete/DeletePlaceController";

const placeRouter = Router();

const placeController = new PlaceController();
const listByGoalCrontroller = new ListPlaceByGoalController();
const updatePlaceController = new UpdatePlaceController();
const deletePlaceController = new DeletePlaceController();

placeRouter.post("/", placeController.handle);
placeRouter.get("", listByGoalCrontroller.handle);
placeRouter.patch("/update/:id", updatePlaceController.handle);
placeRouter.delete("/delete/:id", deletePlaceController.handle);

export { placeRouter };
