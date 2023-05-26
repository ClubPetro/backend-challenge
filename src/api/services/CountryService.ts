import { ModelStatic } from 'sequelize';
import Country from '../../database/models/CountryModel';
import { IServiceCountry } from '../interfaces';

class CountryService implements IServiceCountry {
  protected model: ModelStatic<Country> = Country;

  async getAll(): Promise<Country[]> {
    const contries = await this.model.findAll();
    return contries;
  }
}

export default CountryService;
