import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
import { CountryModule } from './country/country.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), CountryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
