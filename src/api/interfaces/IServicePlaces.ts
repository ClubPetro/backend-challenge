import { IPlacesToGo, IUpdatePlaces } from './IPlacesToGo';

interface IServicePlaces {
  getAll(): Promise<IPlacesToGo[]>
  create(place: IPlacesToGo): Promise<IPlacesToGo>
  update(place: IUpdatePlaces): Promise<[affectedCount: number]>
  remove(id: number): Promise<void>
}

export default IServicePlaces;
