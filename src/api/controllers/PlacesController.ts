import { Request, Response } from 'express';
import { IServicePlaces } from '../interfaces';


class PlacesController {
  private service: IServicePlaces;

  constructor(service: IServicePlaces) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response) {
    const places = await this.service.getAll();
    return res.status(200).json(places);
  }
}

export default PlacesController;