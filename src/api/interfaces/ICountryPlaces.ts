import ICountry from './ICountry';
import IPlacesToGo from './IPlacesToGo';

interface ICountryPlaces extends ICountry, IPlacesToGo {
  createdAt: string;
  updatedAt: string;
}

export default ICountryPlaces;
