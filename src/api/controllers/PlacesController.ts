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

  async create(req: Request, res: Response) {
    const newPlace = await this.service.create(req.body);
    return res.status(201).json(newPlace);
  }

  async update(req: Request, res: Response) {
    await this.service.update(req.body);
    return res.status(200).json({ message: 'Updated' });
  }

  async remove(req: Request, res: Response) {
    await this.service.remove(req.body.id);
    return res.status(204).json({ messsage: 'Deleted' });
  }
}

export default PlacesController;