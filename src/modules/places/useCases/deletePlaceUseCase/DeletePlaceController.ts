import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeletePlaceUseCase } from "./DeletePlaceUseCase";

class DeletePlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deletePlaceUseCase = container.resolve(DeletePlaceUseCase);

    await deletePlaceUseCase.execute(id);

    return response.status(204).send();
  }
}

export { DeletePlaceController };
