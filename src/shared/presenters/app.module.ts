import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@/database/presenters';
import { PlacesModule } from '@/places/presenters';

import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, PlacesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
