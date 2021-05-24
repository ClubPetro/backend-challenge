import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as env from 'dotenv';
env.config();

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/src/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
export default config;
