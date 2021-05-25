import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateGoalUseCase } from "./UpdateGoalUseCase";

class UpdateGoalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { goal } = request.body;

    const updateGoalUseCase = container.resolve(UpdateGoalUseCase);
    await updateGoalUseCase.execute({ id, goal });

    return response.status(204).send();
  }
}

export { UpdateGoalController };
