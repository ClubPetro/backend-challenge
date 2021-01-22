import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { loadModules } from './modules';
import * as ormconfig from './ormconfig';
// read all modules folders and load all available modules
const modules: DynamicModule[] = loadModules();

@Module({
  imports: [
    ConfigModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => ormconfig as any,
    }),
    ...modules,
  ],
})
export class AppModule {}
