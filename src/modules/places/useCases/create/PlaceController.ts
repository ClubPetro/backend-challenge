import { Request, Response } from "express";
import { container } from "tsyringe";
import { PlaceUseCase } from "./PlaceUseCase";

class PlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, goal, country_id } = request.body;

    const placeUsecase = container.resolve(PlaceUseCase);

    const place = await placeUsecase.execute({
      country_id,
      name,
      goal,
    });

    return response.status(201).json(place);
  }
}

export default PlaceController;
