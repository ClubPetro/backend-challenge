import Country from "../infra/typeorm/entities/Country";

interface ICreateCountryDTO {
  id?: string;
  name: string;
  flag_url: string;
}

export { ICreateCountryDTO };
