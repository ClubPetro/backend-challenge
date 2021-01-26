import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { CreateFileDto } from './dto/create-files.dto';
import File from './file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async create(fileData: CreateFileDto): Promise<File> {
    if (_.isNil(fileData)) {
      throw new BadRequestException(
        'Validation Failed. Please set multipart/form .png, .jpg or .jpeg in file property',
      );
    }

    const { filename } = fileData;
    const file = await this.fileRepository.save(new File(filename));
    return file;
  }

  async findOne(id: string): Promise<File> {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    return file;
  }

  async remove(id: string): Promise<void> {
    const file = await this.findOne(id);
    await this.fileRepository.remove(file);
  }
}
