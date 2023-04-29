import { datasource } from "../../../shared/infra/typeorm";
import { Repository } from "typeorm";
import Country from "../infra/typeorm/entities/Country";
import { ICreateCountryDTO } from "../dto/ICreateCountryDto";
import { ICountryRepository } from "./ICountry";

class CountryRepository implements ICountryRepository {
  private repository: Repository<Country>;

  constructor() {
    this.repository = datasource.getRepository(Country);
  }

  async create({ id, name, flag_url }: ICreateCountryDTO): Promise<Country> {
    const country = this.repository.create({
      id,
      name,
      flag_url,
    });

    await this.repository.save(country);

    return country;
  }

  async findByName(name: string): Promise<Country> {
    return await this.repository.findOne({ where: { name } });
  }
}
export default CountryRepository;
