import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import File from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [TypeOrmModule, FilesService],
})
export class FilesModule {}
