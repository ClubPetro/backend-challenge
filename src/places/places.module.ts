import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Place])],
    controllers: [PlacesController],
    providers: [PlacesService],
})
export class PlacesModule {}
