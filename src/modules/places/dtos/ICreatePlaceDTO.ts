interface ICreatePlaceDTO {
  id?: string;
  name: string;
  country: string;
  goal: Date;
  created_at?: Date;
  updated_at?: Date;
}

export { ICreatePlaceDTO };
