import { getRepository, Repository } from "typeorm";

import { ICreatePlaceDTO } from "../../dtos/ICreatePlaceDTO";
import { Place } from "../../entities/Places";
import { IPlacesRepository } from "../IPlacesRepository";

class PlacesRepository implements IPlacesRepository {
  private repository: Repository<Place>;

  constructor() {
    this.repository = getRepository(Place);
  }

  async create({ name, country, goal }: ICreatePlaceDTO): Promise<Place> {
    const place = this.repository.create({ name, country, goal });
    await this.repository.save(place);
    return place;
  }

  async findById(id: string): Promise<Place> {
    const place = await this.repository.findOne(id);
    return place;
  }

  async findByName(name: string): Promise<Place> {
    const place = await this.repository.findOne({ name });
    return place;
  }

  async findByCountry(country: string): Promise<Place[]> {
    const placesByCountry = await this.repository.find({ where: { country } });
    return placesByCountry;
  }

  async listByGoal(): Promise<Place[]> {
    const places = await this.repository.find({ order: { goal: "ASC" } });
    return places;
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { PlacesRepository };
