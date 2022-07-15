import { ITravelsRepository } from "../../repositories/ITravelsRepository"
import {inject, injectable} from "tsyringe";
import { ItravelDTO } from "./ITravelDTO";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/IDateProvider";

@injectable()
class CreateTravelUseCase{
    constructor(
        @inject("TravelsRepository")
        private travelsRepository: ITravelsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
     ){}

     async execute(data: ItravelDTO): Promise<void>{
        const travelAlreadyExists = await this.travelsRepository.findByCountryAndPlace(data.country, data.place);
        if(travelAlreadyExists) throw new AppError("Travel already exists");
        const goal = this.dateProvider.convertStringToDate(data.goal);
        data.goal = goal;
        await this.travelsRepository.create(data);
     }
}

export {CreateTravelUseCase}