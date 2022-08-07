import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travel } from './travels/travel.entity';
import { TravelsController } from './travels/travels.controller';
import { TravelsService } from './travels/travels.service';
import { Country } from './countries/country.entity';
import { CountriesController } from './countries/countries.controller';
import { CountriesService } from './countries/countries.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_STRING,
      database: process.env.MONGODB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    TypeOrmModule.forFeature([Country, Travel]),
  ],
  controllers: [AppController, CountriesController, TravelsController],
  providers: [AppService, CountriesService, TravelsService],
})
export class AppModule {}
