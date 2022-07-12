import { Router } from "express";
import { travelRoutes } from "./travel.routes";

const routes = Router();

routes.use("/travels", travelRoutes);

export {routes}