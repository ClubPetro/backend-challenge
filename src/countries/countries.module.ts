import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Country from './country.entity';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { FilesModule } from '../files/files.module';
@Module({
  imports: [TypeOrmModule.forFeature([Country]), FilesModule],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [TypeOrmModule],
})
export class CountriesModule {}
