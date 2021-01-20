import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Country from './country.entity';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { FilesModule } from '../files/files.module';
import { LocalsModule } from './locals/locals.module';
@Module({
  imports: [TypeOrmModule.forFeature([Country]), FilesModule, LocalsModule],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [TypeOrmModule],
})
export class CountriesModule {}
