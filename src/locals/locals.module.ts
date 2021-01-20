import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';
import Local from './local.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Local])],
  providers: [LocalsService],
  controllers: [LocalsController],
})
export class LocalsModule {}
