import { CreatePlaceController } from "@modules/Place/useCases/createPlace/CreatePlaceController";
import { DeletePlaceController } from "@modules/Place/useCases/deletePlace/DeletePlaceController";
import { EditPlaceController } from "@modules/Place/useCases/editPlace/EditPlaceController";
import { ListPlaceController } from "@modules/Place/useCases/listPlace/ListPlaceController";
import { Router } from "express";

const placeRouter = Router();

const createPlaceController = new CreatePlaceController();
const editPlaceController = new EditPlaceController();
const deletePlaceController = new DeletePlaceController();
const listPlaceController = new ListPlaceController();

placeRouter.post('/create', createPlaceController.handle);
placeRouter.get('/list', listPlaceController.handle);
placeRouter.put('/update', editPlaceController.handle);
placeRouter.delete('/delete', deletePlaceController.handle);

export {placeRouter}