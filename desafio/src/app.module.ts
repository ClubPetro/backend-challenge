import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as env from 'dotenv';
import { PlaceModule } from './modules/place.module';
import config from './ormconfig';

env.config();
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot({ isGlobal: true }),
    PlaceModule,
  ],
})
export class AppModule {}
