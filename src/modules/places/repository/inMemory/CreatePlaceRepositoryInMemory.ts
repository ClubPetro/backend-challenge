import { ICreatePlaceDTO } from "../../dto/ICreatePlaceDTO";
import Place from "../../infra/typeorm/entities/Place";
import { IPlaceRepository } from "../IPlacle";

class CreatePlaceRepositoryInMemory implements IPlaceRepository {
  private placeRepository: Place[] = [];

  async create({ name, goal, country_id }: ICreatePlaceDTO): Promise<Place> {
    const place = new Place();

    Object.assign(place, {
      name,
      goal,
      country_id,
    });

    this.placeRepository.push(place);
    return place;
  }

  async findById(id: string): Promise<Place> {
    const place = this.placeRepository.find((find) => find.id === id);
    return place;
  }
  async findName(name: string): Promise<Place> {
    const Place = this.placeRepository.find((find) => find.name === name);

    return Place;
  }
  async findAll(): Promise<Place[]> {
    const places = this.placeRepository.map((place) => ({
      ...place,
      id: place.id.toString(), // converte o UUID para string
    }));

    // ordena o array de lugares
    places.sort((a, b) => a.goal.localeCompare(b.goal));

    return places;
  }

  async update(data: ICreatePlaceDTO): Promise<Place> {
    const update = this.placeRepository.find((find) => find.id === data.id);
    Object.assign(update, {
      name: data.name,
      goal: data.goal,
    });

    this.placeRepository.push(update);

    return update;
  }

  async delete(id: string): Promise<void> {
    const deleted = this.placeRepository.findIndex((place) => place.id === id);
    if (deleted >= 0) {
      this.placeRepository.slice(deleted, 1);
    }
  }
}

export { CreatePlaceRepositoryInMemory };
