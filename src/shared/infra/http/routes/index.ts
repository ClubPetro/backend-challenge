import { Router } from "express";
import { placeRouter } from "./place";

const router = Router();

router.use('/place',placeRouter)

export {router}