import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ITravelsRepository } from "../../repositories/ITravelsRepository";
import { IUpdateTravelDTO } from "./IUpdateTravelDTO";

@injectable()
class UpdateTravelUseCase{

    constructor(
        @inject("TravelsRepository")
        private travelsRepository: ITravelsRepository
    ){}
    async execute(data: IUpdateTravelDTO): Promise<void>{
        const exists = await this.travelsRepository.findById(data.id);
        if(!exists) throw new AppError("Id does not exists", 404);
        const countryPlaceAlreadyExists = await this.travelsRepository.findByCountryAndPlace(exists.country, data.place);
        if(countryPlaceAlreadyExists && countryPlaceAlreadyExists.id != data.id ) throw new AppError("This Country and Place already exists");
        await this.travelsRepository.update(data);
    }
}

export { UpdateTravelUseCase }