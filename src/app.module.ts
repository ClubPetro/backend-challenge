import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { PlacesModule } from './places/places.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig), 
    PlacesModule
  ]
})
export class AppModule { }
