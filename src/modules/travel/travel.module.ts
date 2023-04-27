import { TravelService } from './travel.service';
import { TravelController } from './travel.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from './entities/travel.entity';
import { TravelRepository } from './repositories/travel.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Travel])],
  controllers: [TravelController],
  providers: [TravelService, TravelRepository],
})
export class TravelModule {}
