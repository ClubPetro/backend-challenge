import ICountryPlaces from './ICountryPlaces';
import IPlacesToGo from './IPlacesToGo';

interface IServicePlace {
  getAll(): Promise<ICountryPlaces[]>
  create(): Promise<ICountryPlaces>
  update(place: IPlacesToGo): Promise<void>
  remove(id: number): Promise<[affectedCount: number]>
}

export default IServicePlace;
