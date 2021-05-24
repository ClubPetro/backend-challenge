import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateNameUseCase } from "./updateNameUseCase";

class UpdateNameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;
    const updateNameUseCase = container.resolve(UpdateNameUseCase);
    await updateNameUseCase.execute({ id, name });

    return response.status(204).send();
  }
}

export { UpdateNameController };
