import { ModelStatic } from 'sequelize';
import Country from '../../database/models/CountryModel';
import { ICountry, IServiceCountry } from '../interfaces';

class CountryService implements IServiceCountry {
  protected model: ModelStatic<Country> = Country;

  async getAll(): Promise<Country[]> {
    const contries = await this.model.findAll();
    return contries;
  }

  async getById(id: number): Promise<ICountry | null> {
    const country = await this.model.findByPk(id);
    return country;
  }
}

export default CountryService;
