import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlaceSchema } from '@/places/domain';

import { PlacesController } from './places.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceSchema])],
  controllers: [PlacesController],
  providers: [],
})
export class PlacesModule {}
