import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModule } from '../../shared/modules/base.module';
import { WorldPlacesRepository } from './worldPlaces.repository';
import { WorldPlacesController } from './worldPlaces.controller';

@Module({
  imports: [BaseModule, TypeOrmModule.forFeature([WorldPlacesRepository])],
  controllers: [WorldPlacesController],
})
export class WorldPlacesModule {}
