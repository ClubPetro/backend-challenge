import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import File from './file.entity';
import * as uploadConfig from '../config/upload.config';

@Module({
  imports: [
    MulterModule.register({
      storage: uploadConfig.default.storage,
      dest: uploadConfig.default.directory,
      fileFilter: uploadConfig.default.fileFilter,
    }),
    TypeOrmModule.forFeature([File]),
  ],
  providers: [FilesService],
  controllers: [FilesController],
  exports: [TypeOrmModule],
})
export class FilesModule {}
