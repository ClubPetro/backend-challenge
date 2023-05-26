import { Request, Response } from 'express';
import { IServiceCountry } from '../interfaces';

class CountryController {
  private service: IServiceCountry;

  constructor(service: IServiceCountry) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response) {
    const contries = await this.service.getAll();
    return res.status(200).json(contries);
  }
}

export default CountryController;