import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocalDto } from './dto/create-local.dto';
import Local from './local.entity';
import { CountriesService } from '../countries.service';
import { UpdateLocalDto } from './dto/update-local.dto';
import { MetasService } from 'src/metas/metas.service';

@Injectable()
export class LocalsService {
  constructor(
    @InjectRepository(Local)
    private localRepository: Repository<Local>,
    @Inject(forwardRef(() => CountriesService))
    private countryService: CountriesService,
    @Inject(forwardRef(() => MetasService))
    private metaService: MetasService,
  ) {}

  async create(createLocalDto: CreateLocalDto): Promise<Local> {
    const { name, countryId } = createLocalDto;

    /*Validacao para ver se o id de country enviado existe, retornando o country*/
    const country = await this.countryService.findOne(String(countryId));

    /*Validacao para ver se o pais ja possui o local nome*/
    const exists = await this.countryService.verifyLocalNameExistsInCountry(
      name,
      country,
    );

    if (exists) {
      throw new BadRequestException(
        `Local with name ${name} already exists in Country ${country.id}`,
      );
    }

    const local = new Local();
    local.name = name;
    local.country = country;

    await this.localRepository.save(local);
    return this.localRepository.findOne(local.id);
  }

  async findAll(): Promise<Local[]> {
    return await this.localRepository.find();
  }

  public async findOne(id: string): Promise<Local> {
    const local = await this.localRepository.findOne(id);
    if (!local) {
      throw new NotFoundException(`Local with id ${id} not found`);
    }
    return local;
  }

  public async remove(id: string) {
    const local = await this.findOne(id);
    /*verificação para ver se existe uma meta associada. se existir, impedir a remoção*/
    const exists = await this.existsMetaAssociatedLocal(String(local.id));
    if (exists) {
      throw new NotAcceptableException(
        'Local have children meta. Please remove this meta first before remove the present local',
      );
    }
    await this.localRepository.delete(local);
  }

  public async update(
    id: string,
    updateLocalDto: UpdateLocalDto,
  ): Promise<Local> {
    /*Verificar se existe local com id enviado na request, retornando o local*/
    const local = await this.findOne(id);
    const { name, countryId } = updateLocalDto;

    if (!!countryId) {
      const updatedCountry = await this.countryService.findOne(
        String(countryId),
      );
      local.name = name || local.name;
      local.country = updatedCountry;
    } else {
      local.name = name || local.name;
    }

    const exists = await this.countryService.verifyLocalNameExistsInCountry(
      name,
      local.country,
    );
    if (exists) {
      throw new BadRequestException(
        `Local with name ${name} already exists in Country ${local.country.name}`,
      );
    }

    await this.localRepository.save(local);
    return this.localRepository.findOne(local.id);
  }

  public async existsMetaAssociatedLocal(localId: string): Promise<boolean> {
    await this.findOne(localId);
    const metas = await this.metaService.findAll();
    /*Se existir, o array vai ter 1 elemento*/
    const arrayAssociatedMetas = metas.filter(
      (meta) => meta.local.id === Number(localId),
    );
    const exists = arrayAssociatedMetas.length === 0 ? false : true;
    return exists;
  }
}
