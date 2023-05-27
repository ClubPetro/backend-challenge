import IPlacesToGo from './IPlacesToGo';

interface IServicePlaces {
  getAll(): Promise<IPlacesToGo[]>
  create(place: IPlacesToGo): Promise<IPlacesToGo>
  update(place: IPlacesToGo): Promise<void>
  remove(id: number): Promise<[affectedCount: number]>
}

export default IServicePlaces;
