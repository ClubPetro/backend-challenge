import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import Country from './country.entity';
import File from '../files/file.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  public async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const { name, fileId } = createCountryDto;
    const country = new Country();
    country.name = name;
    country.file = fileId;

    /*Validacao para ver se o id de arquivo enviado existe*/
    const existsFile = await this.fileRepository.findOne(fileId);
    if (!existsFile) {
      throw new NotFoundException(`file with id ${fileId} not found!`);
    }

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
      throw new NotFoundException(`Country whith id ${id} not found`);
    }
    return country;
  }

  public async remove(id: string): Promise<void> {
    const country = await this.countryRepository.findOne(id);
    if (!country) {
      throw new NotFoundException(`Country whith id ${id} not found`);
    }
    if (country.file) {
      await this.fileRepository.remove(country.file);
    }
    await this.countryRepository.delete(id);
  }
}
