import { ICreatePlaceDTO } from "../dtos/ICreatePlaceDTO";
import { Place } from "../entities/Places";

interface IPlacesRepository {
  create(data: ICreatePlaceDTO): Promise<Place>;
  findById(id: string): Promise<Place>;
  findByName(name: string): Promise<Place>;
  findByCountry(country: string): Promise<Place[]>;
  listByGoal(): Promise<Place[]>;
  remove(id: string): Promise<void>;
}

export { IPlacesRepository };
