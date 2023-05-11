import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePlaceUseCase } from "./UpdatePlaceUseCase";

class UpdatePlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, goal, country_id } = request.body;
    const { id } = request.params;

    const placeUsecase = container.resolve(UpdatePlaceUseCase);

    const update = await placeUsecase.execute({
      id: id,
      country_id,
      name,
      goal,
    });

    return response.status(201).json(update);
  }
}

export default UpdatePlaceController;
