import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPlaceByGoalUseCase } from "./ListPlaceByGoalUseCase";

class ListPlaceByGoalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPlaceGoalByUseCase = container.resolve(ListPlaceByGoalUseCase);

    const places = await listPlaceGoalByUseCase.execute();
    return response.status(201).json(places);
  }
}

export default ListPlaceByGoalController;
