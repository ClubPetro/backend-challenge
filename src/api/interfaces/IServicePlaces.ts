import { IPlacesToGo, IUpdatePlaces } from './IPlacesToGo';

interface IServicePlaces {
  getAll(): Promise<IPlacesToGo[]>
  getById(id: number): Promise<IPlacesToGo | null>
  create(place: IPlacesToGo): Promise<IPlacesToGo>
  update(place: IUpdatePlaces): Promise<[affectedCount: number]>
  remove(id: number): Promise<void>
}

export default IServicePlaces;
