import { container } from "tsyringe";
import { TravelsRepository } from "../../modules/travels/repositories/implementations/TravelsRepository";
import { ITravelsRepository } from '../../modules/travels/repositories/ITravelsRepository';

container.registerSingleton<ITravelsRepository>(
    "TravelsRepository",
    TravelsRepository
)