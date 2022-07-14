import { inject, injectable } from "tsyringe";
import { ITravelsRepository } from "../../repositories/ITravelsRepository";

@injectable()
class ListTravelUseCase{

    constructor(
        @inject("TravelsRepository")
        private travelRepository: ITravelsRepository
    ){}

    async execute(){

        const results = await this.travelRepository.list();

        return results;
    }
}

export {ListTravelUseCase}