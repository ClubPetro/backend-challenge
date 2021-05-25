import { ICountryDataDTO } from "./ICountryDataDTO";

interface ICreatePlaceDTO {
  id?: string;
  name: string;
  country: ICountryDataDTO;
  goal: Date;
  url_flag?: string;
  created_at?: Date;
  updated_at?: Date;
}

export { ICreatePlaceDTO };
