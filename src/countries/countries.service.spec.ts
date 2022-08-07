import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MockType,
  repositoryMockFactory,
} from '../../utils/repository-mock.utils';
import { CountriesService } from './countries.service';
import { MongoRepository } from 'typeorm';
import { Country } from './country.entity';

describe('CountriesService', () => {
  let service: CountriesService;
  let repositoryMock: MockType<MongoRepository<Country>>;
  const country = {
    id: '62ec983a0640cfc7c378564f',
    name: 'Brasil',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        {
          provide: getRepositoryToken(Country),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
    repositoryMock = module.get(getRepositoryToken(Country));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all countries', async () => {
    const countries = [country];
    repositoryMock.find.mockReturnValue(countries);
    expect(await service.get()).toEqual(countries);
    expect(repositoryMock.find).toHaveBeenCalledWith({
      order: { name: 'ASC' },
    });
  });
});
