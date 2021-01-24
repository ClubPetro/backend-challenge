import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import File from './file.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-files.dto';
import uploadConfig from 'src/config/upload.config';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: uploadConfig.fileFilter,
      storage: uploadConfig.storage,
      dest: uploadConfig.directory,
    }),
  )
  create(@UploadedFile() fileData: CreateFileDto): Promise<File> {
    return this.filesService.create(fileData);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<File> {
    return this.filesService.findOne(id);
  }
}
