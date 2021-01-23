import { Module } from '@nestjs/common';
import { MetasController } from './metas.controller';
import { MetasService } from './metas.service';

@Module({
  controllers: [MetasController],
  providers: [MetasService]
})
export class MetasModule {}
