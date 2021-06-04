import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesRepository } from './places.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlacesRepository]),
  ],
  providers: [PlacesService],
  controllers: [PlacesController]
})
export class PlacesModule { }
