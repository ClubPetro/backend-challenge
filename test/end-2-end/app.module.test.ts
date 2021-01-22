import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig.test';

export default async (modules) =>
  await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: async () => ormconfig as any,
      }),
      ...modules,
    ],
  }).compile();
