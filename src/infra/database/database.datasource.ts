import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { CreateTableCountry1685288863751 } from './migrations/1685288863751-create-table-country';
import { CreateTableObjective1685288884925 } from './migrations/1685288884925-create-table-objective';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  synchronize: false,
  migrations: [
    CreateTableCountry1685288863751,
    CreateTableObjective1685288884925,
  ],
});
