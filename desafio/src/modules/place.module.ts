import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceController } from 'src/place/place.controller';
import { PlaceService } from 'src/place/place.service';
import { Place } from 'src/place/places.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
