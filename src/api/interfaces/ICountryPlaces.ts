import ICountry from './ICountry';
import IPlacesToGo from './IPlacesToGo';

interface ICountryPlaces extends IPlacesToGo {
  country: ICountry;
  createdAt: string;
  updatedAt: string;
}

export default ICountryPlaces;
