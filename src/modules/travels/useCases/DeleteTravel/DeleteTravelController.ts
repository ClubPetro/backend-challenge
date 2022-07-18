import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTravelUseCase } from "./DeleteTravelUseCase";


class DeleteTravelController{

    async handle(request:Request, response:Response): Promise<Response> {
        const {id} = request.params;
        const deleteTravelUseCase =  container.resolve(DeleteTravelUseCase);
        await deleteTravelUseCase.execute(id);
        return response.status(200).json({"message":"Deleted with success"})
    }
}


export {DeleteTravelController}