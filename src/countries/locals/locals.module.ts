import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';
import { CountriesModule } from '../countries.module';
import Local from './local.entity';
import { MetasModule } from 'src/metas/metas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Local]),
    forwardRef(() => CountriesModule),
    forwardRef(() => MetasModule),
  ],
  controllers: [LocalsController],
  providers: [LocalsService],
  exports: [TypeOrmModule, LocalsService],
})
export class LocalsModule {}
