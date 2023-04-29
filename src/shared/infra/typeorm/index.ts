import { DataSource } from "typeorm";
import Country from "../../../modules/country/infra/typeorm/entities/Country";
import Place from "../../../modules/places/infra/typeorm/entities/Place";
import { Country1682615091268 } from "./migrations/1682615091268-Country";
import { Place1682616036653 } from "./migrations/1682616036653-Place";

export const datasource = new DataSource({
  type: "postgres",
  host: "192.168.99.100",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "API",
  migrations: [Country1682615091268, Place1682616036653],
  entities: [Country, Place],
});
