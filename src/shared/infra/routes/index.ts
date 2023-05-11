import { Router } from "express";

import countryRoutes from "./country.routes";
import { placeRouter } from "./place.routes";

const router = Router();
router.use("/country", countryRoutes);
router.use("/place", placeRouter);
router.use("/", placeRouter);

export { router };
