import { Request, Response } from "express";
import { container } from "tsyringe";
import { DaletePlaceUseCase } from "./DaletePlaceUseCase";

class DeletePlaceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deletePlaceUseCase = container.resolve(DaletePlaceUseCase);

    await deletePlaceUseCase.execute(id);

    return response.status(201).send({ message: "Place was deleted!" });
  }
}

export { DeletePlaceController };
