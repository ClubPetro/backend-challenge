import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePlaceUseCase } from "./CreatePlaceUseCase";

class CreatePlaceController {
  async handle(request: Request, response: Response): Promise<Response>{
    const {country, local, url, meta} = request.body;

    const createPlaceUseCase = container.resolve(CreatePlaceUseCase)

    try{
      await createPlaceUseCase.execute({
        country,
        local,
        meta,
        url
      })
    }catch(err){
      return response.status(400).json(err)
    }
    return response.status(201).json('created')
  }
}

export {CreatePlaceController}