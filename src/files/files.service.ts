import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-files.dto';
import File from './file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async create({ filename }: CreateFileDto): Promise<File> {
    const file = await this.fileRepository.save(new File(filename));
    return file;
  }

  async findOne(id: string): Promise<File> {
    const file = await this.fileRepository.findOne(id);
    if (!file) {
      throw new NotFoundException(`File whith id ${id} not found`);
    }
    return file;
  }
}
