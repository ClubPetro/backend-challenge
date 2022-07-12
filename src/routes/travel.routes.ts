import { Router } from "express";
import { CreateTravelController } from "../modules/travels/useCases/CreateTravelController";

const travelRoutes = Router();

const createTravelController = new CreateTravelController();

travelRoutes.post("/", createTravelController.handle )

export {travelRoutes}