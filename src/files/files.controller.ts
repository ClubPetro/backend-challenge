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

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file): Promise<File> {
    return this.filesService.create(file);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<File> {
    return this.filesService.findOne(id);
  }
}
