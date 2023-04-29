import { ICreatePlaceDTO } from "../dto/ICreatePlaceDTO";
import Place from "../infra/typeorm/entities/Place";
interface IPlaceRepository {
  create(data: ICreatePlaceDTO): Promise<Place>;
  findName(name: string): Promise<Place | undefined>;
  findById(id: string): Promise<Place>;
  findAll(): Promise<Place[]>;
  update(data): Promise<Place>;
  delete(id: string): Promise<void>;
}

export { IPlaceRepository };
