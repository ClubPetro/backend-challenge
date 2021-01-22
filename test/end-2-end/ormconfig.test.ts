import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const data: any = fs.existsSync('.env')
  ? dotenv.parse(fs.readFileSync('.env'))
  : process.env;

// Check typeORM documentation for more information.
const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: data.DATABASE_TEST_HOST,
  port: +data.DATABASE_TEST_PORT,
  username: data.DATABASE_TEST_USER,
  password: data.DATABASE_TEST_PASSWORD,
  database: data.DATABASE_TEST_DBNAME,
  entities: [`${__dirname}/../../src/**/*.entity{.ts,.js}`],
  keepConnectionAlive: true,
  synchronize: false,
  subscribers: [`${__dirname}/../../src/**/*.subscriber{.ts,.js}`],
  migrationsRun: true,
  logging: false,
  logger: null,
  migrations: [`${__dirname}/../../src/migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: `${__dirname}/../../src/migrations`,
  },
};

export = config;
