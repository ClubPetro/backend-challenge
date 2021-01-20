import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocalDto } from './dto/create-local.dto';
import Local from './local.entity';

@Injectable()
export class LocalsService {
  constructor(
    @InjectRepository(Local)
    private localRepository: Repository<Local>,
  ) {}

  async create(createLocalDto: CreateLocalDto): Promise<Local> {
    const local = new Local();
    local.name = createLocalDto.name;
    local.country = createLocalDto.countryId;
    return await this.localRepository.save(local);
  }
}
