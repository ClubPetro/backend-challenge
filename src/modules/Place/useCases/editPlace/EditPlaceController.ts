import { Request, Response } from "express";
import { container } from "tsyringe";
import { EditPlaceUseCase } from "./EditPlaceUseCase";

class EditPlaceController {
  async handle(request: Request, response: Response): Promise<Response>{
    const {id, local, meta} = request.body;

    const editPlaceUseCase = container.resolve(EditPlaceUseCase)

    try{
      const placeUpdated = await editPlaceUseCase.execute({
        id,
        local,
        meta
      })
      return response.status(200).json(placeUpdated)

    }catch(err){
      return response.status(400).json(err)
    }
  }
}

export {EditPlaceController}