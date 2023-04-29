import { ICreateCountryDTO } from "../dto/ICreateCountryDto";
import Country from "../infra/typeorm/entities/Country";
interface ICountryRepository {
  create(data: ICreateCountryDTO): Promise<Country>;
  findByName(name: string): Promise<Country>;
}

export { ICountryRepository };
