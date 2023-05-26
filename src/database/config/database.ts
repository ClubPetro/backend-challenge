import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || 'password',
  database: process.env.MYSQL_DB_NAME || 'CLUB_PETRO',
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQLPORT) || 33060,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = config;