import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalsService } from 'src/countries/locals/locals.service';
import { Repository } from 'typeorm';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';
import Meta from './meta.entity';

import { compareDate } from '../utils/compare.date';

@Injectable()
export class MetasService {
  constructor(
    @InjectRepository(Meta)
    private metaRepository: Repository<Meta>,
    @Inject(LocalsService)
    private localService: LocalsService,
  ) {}

  public async create(createMetaDto: CreateMetaDto): Promise<Meta> {
    const { date, localId } = createMetaDto;

    /*Validacao para ver se o id de local enviado existe, retornando o local*/
    const local = await this.localService.findOne(String(localId));

    const meta = new Meta();
    meta.date = date;
    meta.local = local;

    /*Validacao para garantir que + de uma meta nao esteja associado a um mesmo local*/
    const existsLocalAssociatedMeta = await this.metaRepository.findOne({
      where: [{ local: meta.local }],
    });
    if (existsLocalAssociatedMeta) {
      throw new BadRequestException(
        'One meta must be associated with only one local',
      );
    }

    /* Se verdadeiro, a primeira data é menor(antes) que a segunda,
     sendo uma meta passada inválida */
    const isBeforeThanToday = compareDate(new Date(meta.date), new Date());
    if (isBeforeThanToday) {
      throw new BadRequestException(
        'Your meta date is before today. Please set one after today date',
      );
    }
    await this.metaRepository.save(meta);
    return this.metaRepository.findOne(meta.id);
  }

  async findAll(): Promise<Meta[]> {
    return await this.metaRepository.find();
  }

  async findOne(id: string): Promise<Meta> {
    const meta = await this.metaRepository.findOne(id);
    if (!meta) {
      throw new NotFoundException(`Meta with id ${id} not found`);
    }
    return meta;
  }

  async remove(id: string): Promise<void> {
    const meta = await this.findOne(id);
    await this.metaRepository.delete(meta.id);
  }

  public async update(id: string, updateMetaDto: UpdateMetaDto): Promise<Meta> {
    const { date, localId } = updateMetaDto;

    /*Verificar se existe meta com id enviado na request, retornando a meta*/
    const meta = await this.findOne(id);

    /*Validacao para garantir que + de uma meta nao esteja associado a um mesmo local*/
    if (!(!!localId && meta.local.id === Number(localId))) {
      const existsLocalAssociatedMeta = await this.metaRepository.findOne({
        where: [{ local: meta.local }],
      });
      if (existsLocalAssociatedMeta) {
        throw new BadRequestException(
          'One meta must be associated with only one local',
        );
      }
    }

    if (!!localId) {
      const updatedLocal = await this.localService.findOne(String(localId));
      meta.date = date || meta.date;
      meta.local = updatedLocal;
    } else {
      meta.date = date || meta.date;
    }

    /* Se verdadeiro, a primeira data é menor(antes) que a segunda,
     sendo uma meta passada inválida */
    const isBeforeThanToday = compareDate(new Date(meta.date), new Date());
    if (isBeforeThanToday) {
      throw new BadRequestException(
        'Your meta date is before today. Please set one after today date',
      );
    }

    await this.metaRepository.save(meta);
    return this.metaRepository.findOne(meta.id);
  }
}
