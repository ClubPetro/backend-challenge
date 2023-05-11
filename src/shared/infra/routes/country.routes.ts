import { Router } from "express";

import CreateCountryController from "../../../modules/country/useCase/CreateCountryController";
const countryRouter = Router();

const createCountryController = new CreateCountryController();
countryRouter.post("/", createCountryController.handle);

export default countryRouter;
