import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import './envs';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNCHRONIZE == 'true' ? true : false,
  //  ssl:
  //    process.env.NODE_ENV !== 'local'
  //      ? {
  //          rejectUnauthorized: null,
  //        }
  //      : null,
};
