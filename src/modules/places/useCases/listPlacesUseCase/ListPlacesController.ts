import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListPlacesUseCase } from "./ListPlacesUseCase";

class ListPlacesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPlacesUseCase = container.resolve(ListPlacesUseCase);
    const places = await listPlacesUseCase.execute();

    return response.json({ places });
  }
}

export { ListPlacesController };
