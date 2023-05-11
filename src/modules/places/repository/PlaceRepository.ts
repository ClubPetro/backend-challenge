import { datasource } from "../../../shared/infra/typeorm";
import { Repository } from "typeorm";
import Place from "../infra/typeorm/entities/Place";
import Country from "../../country/infra/typeorm/entities/Country";
import { ICreatePlaceDTO } from "../dto/ICreatePlaceDTO";
import { IPlaceRepository } from "./IPlacle";

class PlaceRepository implements IPlaceRepository {
  private repository: Repository<Place>;
  private countryRepository: Repository<Country>;
  constructor() {
    this.repository = datasource.getRepository(Place);
    this.countryRepository = datasource.getRepository(Country);
  }

  async create({ name, goal, country_id }: ICreatePlaceDTO): Promise<Place> {
    const country = await this.countryRepository.findOneOrFail({
      where: { id: country_id },
    });
    const place = this.repository.create({
      country,
      name,
      goal,
    });
    await this.repository.save(place);

    return place;
  }

  async findAll(): Promise<Place[]> {
    const place = await this.repository.find({
      order: {
        goal: "ASC",
      },
    });
    return place;
  }

  async findName(name: string): Promise<Place> {
    const place = await this.repository.findOne({
      where: { name: name },
    });

    return place;
  }
  async findByNameAndCountryId(
    name: string,
    country_id: string
  ): Promise<Place[]> {
    const places = await this.repository.find({
      where: { name: name, country: { id: country_id } },
    });
    return places;
  }

  async update({ id, name, goal }: ICreatePlaceDTO): Promise<Place> {
    const place = await this.repository.findOne({ where: { id } });
    place.name = name;
    place.goal = goal;

    return await this.repository.save(place);
  }

  async findById(id: string): Promise<Place> {
    return await this.repository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default PlaceRepository;
