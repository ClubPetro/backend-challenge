import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';
import { CountriesModule } from '../countries.module';
import Local from './local.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Local]),
    forwardRef(() => CountriesModule),
  ],
  controllers: [LocalsController],
  providers: [LocalsService],
  exports: [TypeOrmModule, LocalsService],
})
export class LocalsModule {}
