import "reflect-metadata";
import { container } from "tsyringe";
import { ICountryRepository } from "../../modules/country/repository/ICountry";
import CountryRepository from "../../modules/country/repository/CountryRepository";
import { IPlaceRepository } from "../../modules/places/repository/IPlacle";
import PlaceRepository from "../../modules/places/repository/PlaceRepository";

container.registerSingleton<ICountryRepository>(
  "CountryRepository",
  CountryRepository
);

container.registerSingleton<IPlaceRepository>(
  "PlaceRepository",
  PlaceRepository
);

container.registerSingleton<IPlaceRepository>(
  "listPlaceRepository",
  PlaceRepository
);

container.registerSingleton<IPlaceRepository>(
  "UpdateRepository",
  PlaceRepository
);

container.registerSingleton<PlaceRepository>(
  "DeletePlaceRepository",
  PlaceRepository
);
