import { container } from "tsyringe";
import { TravelsRepository } from "../../modules/travels/repositories/implementations/TravelsRepository";
import { ITravelsRepository } from '../../modules/travels/repositories/ITravelsRepository';
import { IDateProvider } from "../providers/IDateProvider";
import { DateProvider } from "../providers/implementations/DateProvider";

container.registerSingleton<ITravelsRepository>(
    "TravelsRepository",
    TravelsRepository
)

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DateProvider
)