import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCountryUseCase from "./CreateCountryUseCase";

class CreateCountryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, flag_url } = request.body;
    const { id } = request.params;

    const createCountryUsecase = container.resolve(CreateCountryUseCase);

    const country = await createCountryUsecase.execute({
      id,
      name,
      flag_url,
    });

    return response.status(201).json(country);
  }
}

export default CreateCountryController;
