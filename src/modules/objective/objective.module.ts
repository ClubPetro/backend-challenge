import { Module } from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { ObjectiveController } from './objective.controller';
import { ObjectiveEntity } from './entities/objective.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryModule } from '../country/country.module';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectiveEntity]), CountryModule],
  controllers: [ObjectiveController],
  providers: [ObjectiveService],
})
export class ObjectiveModule {}
