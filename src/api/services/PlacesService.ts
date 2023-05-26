import { ModelStatic } from 'sequelize';
import { ICountryPlaces, IPlacesToGo, IServicePlaces } from '../interfaces';
import Places from '../../database/models/PlacesToGoModel';
import Country from '../../database/models/CountryModel';

class PlacesService implements IServicePlaces {
  protected model: ModelStatic<Places> = Places;

  async getAll(): Promise<IPlacesToGo[]> {
    const places = await this.model.findAll({
      include: [
        {
          model: Country,
          as: 'country',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return places;
  }

  async create(): Promise<ICountryPlaces> {
    throw new Error('Method not implemented.');
  }

  async update(place: IPlacesToGo): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<[affectedCount: number]> {
    throw new Error('Method not implemented.');
  }
}

export default PlacesService;
