import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ITravelsRepository } from "../../repositories/ITravelsRepository";

@injectable()
class DeleteTravelUseCase{

    constructor(
        @inject("TravelsRepository")
        private travelsRepository: ITravelsRepository    
    ){}

    async execute(id:string): Promise<void>{
        const exists = await this.travelsRepository.findById(id);
        if(!exists) throw new AppError("This id does not exists", 404);
        await this.travelsRepository.delete(id);

    }
}

export {DeleteTravelUseCase}