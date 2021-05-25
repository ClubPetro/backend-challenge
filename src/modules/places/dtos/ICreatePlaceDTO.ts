interface ICreatePlaceDTO {
  id?: string;
  name: string;
  country: string;
  goal: Date;
  url_flag?: string;
  created_at?: Date;
  updated_at?: Date;
}

export { ICreatePlaceDTO };
