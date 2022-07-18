import { inject, injectable } from "tsyringe";
import { ITravelsRepository } from "../../repositories/ITravelsRepository";

@injectable()
class ListTravelUseCase{

    constructor(
        @inject("TravelsRepository")
        private travelsRepository: ITravelsRepository
    ){}

    async execute(){
        const results = await this.travelsRepository.list();
        return results;
    }
}

export {ListTravelUseCase}