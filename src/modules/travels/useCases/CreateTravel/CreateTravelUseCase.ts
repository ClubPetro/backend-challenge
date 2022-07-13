import { ITravelsRepository } from "../../repositories/ITravelsRepository"
import {inject, injectable} from "tsyringe";
import { ItravelDTO } from "./ITravelDTO";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateTravelUseCase{
    constructor(
        @inject("TravelsRepository")
        private travelsRepository: ITravelsRepository
     ){}

     async execute(data: ItravelDTO): Promise<void>{
         const travelAlreadyExists = await this.travelsRepository.findByCountryAndPlace(data.country, data.place);
         if(travelAlreadyExists) throw new AppError("Travel already exists");
        await this.travelsRepository.create(data);
     }
}

export {CreateTravelUseCase}