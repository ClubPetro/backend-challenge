import { ModelStatic } from 'sequelize';
import { IServicePlaces, IPlacesToGo, IUpdatePlaces } from '../interfaces';
import Places from '../../database/models/PlacesToGoModel';
import Country from '../../database/models/CountryModel';

class PlacesService implements IServicePlaces {
  protected model: ModelStatic<Places> = Places;

  static formatPlaces(places: IPlacesToGo[]) {
    const formatedPlaces = places.map((place) => {
      const handleMeta = place.meta.split('-');
      const formatedMeta = `${handleMeta[1]}/${handleMeta[0]}`;
      place.meta = formatedMeta;
      return place;
    });

    return formatedPlaces;
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

  async create(place: IPlacesToGo): Promise<IPlacesToGo> {
    const { countryId, placeName, meta } = place;
    const handleMeta = meta.split('/');
    const formatedMeta = `${handleMeta[1]}-${handleMeta[0]}-01`;
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
    const handleMeta = meta.split('/');
    const formatedMeta = `${handleMeta[1]}-${handleMeta[0]}-01`;

    const updatePlace = await this.model.update({
      placeName,
      meta: formatedMeta,
      updatedAt: new Date(),
    }, { where: { id } });

    return updatePlace;
  }

  async remove(id: number): Promise<void> {
    await this.model.destroy({ where: { id }});
  }
}

export default PlacesService;
