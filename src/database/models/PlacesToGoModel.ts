import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import Country from './CountryModel';

class PlacesToGo extends Model {
  declare countryId: number;
  declare placeName: string;
  declare meta: string;
  declare createdAt: string;
  declare updatedAt: string;
}

PlacesToGo.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    countryId: {
      type: INTEGER,
      allowNull: false,
      primaryKey:  true,
    },
    placeName: {
      type: STRING,
      allowNull: false,
      primaryKey:  true,
    },
    meta: {
      type: STRING,
      allowNull: false,
    },
    createdAt: {
      type: STRING,
      allowNull: false,
    },
    updatedAt: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    modelName: 'places_to_go',
  },
);

PlacesToGo.belongsTo(Country, { foreignKey: 'countryId', as: 'country' });

export default PlacesToGo;