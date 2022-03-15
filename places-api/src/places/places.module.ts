import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesService } from './service/places.service';
import { PlacesController } from './controller/places.controller';
import { Place } from './models/place.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  controllers: [PlacesController],
  providers: [PlacesService]
})
export class PlacesModule { }
