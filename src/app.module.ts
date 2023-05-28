import { Module } from '@nestjs/common';
import DatabaseModule from './infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CountryModule } from './modules/country/country.module';
import { ObjectiveModule } from './modules/objective/objective.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    CountryModule,
    ObjectiveModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
