import ICountry from './ICountry';

interface IServiceCountry {
  getAll(): Promise<ICountry[]>;
  getById(id: number): Promise<ICountry | null>
}

export default IServiceCountry;