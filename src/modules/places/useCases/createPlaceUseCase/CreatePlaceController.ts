import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreatePlaceUseCase } from "./CreatePlaceUseCase";

class CreatePlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, country_data, goal } = request.body;
    const createPlaceUseCase = container.resolve(CreatePlaceUseCase);
    const place = await createPlaceUseCase.execute({
      name,
      country: country_data,
      goal,
    });

    return response.status(201).json(place);
  }
}

export { CreatePlaceController };
