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
import { CreateCountryDto } from './dto/create-country.dto';
import Country from './country.entity';
import { FilesService } from 'src/files/files.service';
import { LocalsService } from './locals/locals.service';
import Local from './locals/local.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @Inject(FilesService)
    private fileService: FilesService,
    @Inject(forwardRef(() => LocalsService))
    private localService: LocalsService,
  ) {}

  public async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const { name, fileId } = createCountryDto;

    /*Validacao para ver se o id de arquivo enviado existe, retornando o arquivo*/
    const file = await this.fileService.findOne(String(fileId));

    const country = new Country();
    country.name = name;
    country.file = file;

    /*Validacao para garantir que + de um pais nao esteja associado a um mesmo arquivo (bandeira)*/
    const existsFileAssociatedCountry = await this.countryRepository.findOne({
      where: [{ file: country.file }],
    });
    if (existsFileAssociatedCountry) {
      throw new BadRequestException(
        'One flag file must be associated with only one country',
      );
    }

    /*Validacao para evitar paises com nomes duplicados**/
    const duplicateCountryName = await this.countryRepository.findOne({
      where: [{ name: country.name }],
    });
    if (duplicateCountryName) {
      throw new BadRequestException('The Country cannot has duplicate name.');
    }

    await this.countryRepository.save(country);
    return this.countryRepository.findOne(country.id);
  }

  public findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  public async findOne(id: string): Promise<Country> {
    const country = await this.countryRepository.findOne(id);
    if (!country) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }
    return country;
  }

  public async remove(id: string): Promise<void> {
    const country = await this.findOne(id);

    /*Verificar se o país possui locais. Impedir remoção caso tenha (sem  onDelete CASCADE)*/
    const locals = await this.findAllLocalsInCountry(String(country.id));
    if (locals.length !== 0) {
      throw new NotAcceptableException(
        'Country have children locals. Please remove this locals first before remove this country',
      );
    }

    await this.fileService.remove(String(country.file.id));
    await this.countryRepository.delete(country);
  }

  public async verifyLocalNameExistsInCountry(
    localName: string,
    country: Country,
  ): Promise<boolean> {
    const countryLocals = await this.findAllLocalsInCountry(String(country.id));
    const exists = countryLocals.find((local) => local.name === localName);
    return !!exists;
  }

  public async findAllLocalsInCountry(countryId: string): Promise<Local[]> {
    await this.findOne(countryId);
    const locals = await this.localService.findAll();
    const countryLocals = locals.filter(
      (local) => local.country.id === Number(countryId),
    );
    return countryLocals;
  }
}
