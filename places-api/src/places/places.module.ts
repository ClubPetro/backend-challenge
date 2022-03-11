import { Module } from '@nestjs/common';
import { PlacesService } from './service/places.service';
import { PlacesController } from './controller/places.controller';

@Module({
  controllers: [PlacesController],
  providers: [PlacesService]
})
export class PlacesModule { }
