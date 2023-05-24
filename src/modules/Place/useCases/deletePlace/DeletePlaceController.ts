import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePlaceUseCase } from "./DeletePlaceUseCase";

class DeletePlaceController {
  async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.query;

    const deletePlaceUseCase = container.resolve(DeletePlaceUseCase)

    try{
      await deletePlaceUseCase.execute({
        id: id.toString()
      })
    }catch(err){
      return response.status(400).json(err)
    }
    return response.status(200).json('deleted')
  }
}

export {DeletePlaceController}