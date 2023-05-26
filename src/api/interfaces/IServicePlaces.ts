import ICountryPlaces from './ICountryPlaces';
import IPlacesToGo from './IPlacesToGo';

interface IServicePlaces {
  getAll(): Promise<IPlacesToGo[]>
  create(): Promise<ICountryPlaces>
  update(place: IPlacesToGo): Promise<void>
  remove(id: number): Promise<[affectedCount: number]>
}

export default IServicePlaces;
