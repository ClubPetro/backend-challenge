interface IUpdatePlaces {
  id?: number;
  placeName: string;
  meta: string;
}

interface IPlacesToGo extends IUpdatePlaces {
  countryId: number;
}

export { IPlacesToGo, IUpdatePlaces };
