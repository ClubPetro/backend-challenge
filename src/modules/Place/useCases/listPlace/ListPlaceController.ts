import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPlaceUseCase } from "./ListPlaceUseCase";

class ListPlaceController {
  async handle(request: Request, response: Response): Promise<Response>{

    const listPlaceUseCase = container.resolve(ListPlaceUseCase)

    try{
      const list = await listPlaceUseCase.execute()
      return response.status(200).json(list)

    }catch(err){
      return response.status(400).json(err)
    }
  }
}

export {ListPlaceController}