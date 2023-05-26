import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';
import Country from './CountryModel';

class Places extends Model {
  declare id: number;
  declare countryId: number;
  declare placeName: string;
  declare meta: string;
  declare createdAt: string;
  declare updatedAt: string;
}

Places.init(
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
    modelName: 'places',
  },
);

Places.belongsTo(Country, { foreignKey: 'countryId', as: 'country' });

export default Places;