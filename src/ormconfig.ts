import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const data: any = fs.existsSync('.env')
  ? dotenv.parse(fs.readFileSync('.env'))
  : process.env;

const migrationsRun =
  data.DATABASE_MIGRATIONS_RUN === 'true' && data.NODE_ENV !== 'test';
// Check typeORM documentation for more information.
const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: data.DATABASE_HOST,
  port: +data.DATABASE_PORT,
  username: data.DATABASE_USER,
  password: data.DATABASE_PASSWORD,
  database: data.DATABASE_DBNAME,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  keepConnectionAlive: true,
  synchronize: false,
  migrationsRun,
  logging: data.DATABASE_LOGGING === 'true',
  logger: data.DATABASE_LOGGING_TYPE || null,
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;
