import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import { CountriesModule } from './countries/countries.module';
import { envConfig } from './config/env.load';
import { MetasModule } from './metas/metas.module';
import * as ormConfig from './config/orm.config';

@Module({
  imports: [
    HttpModule.register({ baseURL: envConfig.api.baseUrl }),
    TypeOrmModule.forRoot(ormConfig),
    FilesModule,
    CountriesModule,
    MetasModule,
  ],
})
export class AppModule {}
