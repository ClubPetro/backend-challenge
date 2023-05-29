import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Country extends Model {
  declare id: number;
  declare name: string;
  declare urlImage: string;
}

Country.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    urlImage: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    modelName: 'countries',
  },
);

export default Country;