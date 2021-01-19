import { ConnectionOptions } from 'typeorm';
import { envConfig } from './env.load';
import { resolve } from 'path';

const config: ConnectionOptions = {
  type: 'mysql',
  host: envConfig.db.host,
  port: envConfig.db.port,
  username: envConfig.db.username,
  password: envConfig.db.password,
  database: envConfig.db.database,
  synchronize: envConfig.db.synchronize,
  entities: [resolve(__dirname, '..', '**', '*.entity{.ts,.js}')],
  migrationsRun: false,
  migrations: [resolve(__dirname, '..', 'migrations', '**/*{.ts,.js}')],
  cli: {
    migrationsDir: resolve(__dirname, '..', 'migrations'),
  },
};

export = config;
