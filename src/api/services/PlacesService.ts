import { ModelStatic } from 'sequelize';
import { IServicePlaces, IPlacesToGo, IUpdatePlaces } from '../interfaces';
import Places from '../../database/models/PlacesToGoModel';
import Country from '../../database/models/CountryModel';
import { NotFound } from '../errors';
import placeValidation from './validations/placeValidation';
import CountryService from './CountryService';

class PlacesService implements IServicePlaces {
  protected model: ModelStatic<Places> = Places;
  private countryService = new CountryService();

  static formatPlaces(places: IPlacesToGo[]) {
    const formatedPlaces = places.map((place) => {
      const handleMeta = place.meta.split('-');
      const formatedMeta = `${handleMeta[1]}/${handleMeta[0]}`;
      place.meta = formatedMeta;
      return place;
    });

    return formatedPlaces;
  }

  static formatMeta(meta: string) {
    const handleMeta = meta.split('/');
    return `${handleMeta[1]}-${handleMeta[0]}-01`;
  }

  async getAll(): Promise<IPlacesToGo[]> {
    const places = await this.model.findAll({
      include: [
        {
          model: Country,
          as: 'country',
          attributes: { exclude: ['id'] },
        },
      ],
      order: [['meta', 'ASC']],
    });

    const formatedPlaces = PlacesService.formatPlaces(places);
    return formatedPlaces;
  }

  async getById(id: number): Promise<IPlacesToGo | null> {
    const place = await this.model.findByPk(id);
    return place;
  }

  async create(place: IPlacesToGo): Promise<IPlacesToGo> {
    const { countryId, placeName, meta } = place;

    const checkCountryId = await this.countryService.getById(countryId);
    if (!checkCountryId) throw new NotFound('Country not found');

    placeValidation(placeName, meta);
    
    const formatedMeta = PlacesService.formatMeta(meta);
    const currentDate = new Date();
    
    const newPlace = await this.model.create({
      countryId,
      placeName,
      meta: formatedMeta,
      createdAt: currentDate,
      updatedAt: currentDate,
    });

    return newPlace;
  }

  async update(place: IUpdatePlaces): Promise<[affectedCount: number]>{
    const { id, placeName, meta } = place;

    const checkId = await this.getById(Number(id));
    if (!checkId) throw new NotFound('Place not found');
    
    placeValidation(placeName, meta);

    const formatedMeta = PlacesService.formatMeta(meta);

    const updatePlace = await this.model.update({
      placeName,
      meta: formatedMeta,
      updatedAt: new Date(),
    }, { where: { id } });

    return updatePlace;
  }

  async remove(id: number): Promise<void> {
    const place = await this.getById(id);
    if (!place) throw new NotFound('Place not found');
    await this.model.destroy({ where: { id }});
  }
}

export default PlacesService;
