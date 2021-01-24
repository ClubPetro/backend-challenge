import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetasController } from './metas.controller';
import { MetasService } from './metas.service';
import { LocalsModule } from '../countries/locals/locals.module';
import Meta from './meta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meta]), LocalsModule],
  controllers: [MetasController],
  providers: [MetasService],
  exports: [TypeOrmModule],
})
export class MetasModule {}
