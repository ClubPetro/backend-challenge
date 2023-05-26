import ICountry from './ICountry';

interface IServiceCountry {
  getAll(): Promise<ICountry[]>;
}

export default IServiceCountry;