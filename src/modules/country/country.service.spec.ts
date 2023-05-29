import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from './country.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { CountryEntity } from './entities/country.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CountryService', () => {
  let service: CountryService;
  let countryRepository: DeepMocked<Repository<CountryEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: getRepositoryToken(CountryEntity),
          useValue: createMock<Repository<CountryEntity>>(),
        },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
    countryRepository = module.get(getRepositoryToken(CountryEntity));
  });

  describe('Find All', () => {
    describe('Successful Case', () => {
      it('should be return all country', async () => {
        countryRepository.find.mockResolvedValue([
          {
            id: 'uuid',
            createdAt: new Date(),
            name: 'brasil',
            flagUrl: 'url',
          } as CountryEntity,
        ]);

        const serviceResponses = await service.findAll();

        expect(serviceResponses).toBeDefined();
        expect(serviceResponses).toHaveProperty('length');
        expect(serviceResponses.length).toBeGreaterThan(0);

        for (const serviceResponse of serviceResponses) {
          expect(serviceResponse).toHaveProperty('id');
          expect(serviceResponse).toHaveProperty('name');
          expect(serviceResponse).toHaveProperty('flagUrl');
          expect(serviceResponse).toHaveProperty('createdAt');
        }

        expect(countryRepository.find).toHaveBeenCalled();
        expect(countryRepository.find).toBeCalledTimes(1);
      });
    });
  });

  describe('Find One By Id', () => {
    describe('Successful Case', () => {
      it('should be return one country', async () => {
        countryRepository.findOneBy.mockResolvedValue({
          id: 'uuid',
          createdAt: new Date(),
          name: 'brasil',
          flagUrl: 'url',
        } as CountryEntity);

        const serviceResponse = await service.findOneById('uuid');

        expect(serviceResponse).toBeDefined();

        expect(serviceResponse).toHaveProperty('id');
        expect(serviceResponse).toHaveProperty('name');
        expect(serviceResponse).toHaveProperty('flagUrl');
        expect(serviceResponse).toHaveProperty('createdAt');

        expect(countryRepository.findOneBy).toHaveBeenCalled();
        expect(countryRepository.findOneBy).toBeCalledTimes(1);
      });
    });
  });

  describe('Create', () => {
    describe('Successful Case', () => {
      it('should be create new country and return country created', async () => {
        const payload = {
          name: 'name',
          flagUrl: 'url',
        };

        countryRepository.findOneBy.mockResolvedValue(null);

        countryRepository.create.mockReturnValue({
          name: 'brasil',
          flagUrl: 'url',
        } as CountryEntity);

        countryRepository.save.mockResolvedValue({
          id: 'uuid',
          createdAt: new Date(),
          name: 'brasil',
          flagUrl: 'url',
        } as CountryEntity);

        const serviceResponse = await service.create(payload);

        expect(serviceResponse).toBeDefined();

        expect(serviceResponse).toHaveProperty('id');
        expect(serviceResponse).toHaveProperty('name');
        expect(serviceResponse).toHaveProperty('flagUrl');
        expect(serviceResponse).toHaveProperty('createdAt');

        expect(countryRepository.findOneBy).toHaveBeenCalled();
        expect(countryRepository.findOneBy).toBeCalledTimes(1);

        expect(countryRepository.create).toHaveBeenCalled();
        expect(countryRepository.create).toBeCalledTimes(1);

        expect(countryRepository.save).toHaveBeenCalled();
        expect(countryRepository.save).toBeCalledTimes(1);
      });
    });

    describe('Error Case', () => {
      it('should be throw a HttpException if find some country', async () => {
        const payload = {
          name: 'name',
          flagUrl: 'url',
        };

        countryRepository.findOneBy.mockResolvedValue({
          id: 'uuid',
          createdAt: new Date(),
          name: 'brasil',
          flagUrl: 'url',
        } as CountryEntity);

        const serviceResponse = service.create(payload);

        await expect(serviceResponse).rejects.toBeInstanceOf(HttpException);
        await expect(serviceResponse).rejects.toThrow(
          new HttpException(
            'Country name is already exists',
            HttpStatus.NOT_FOUND,
          ),
        );

        expect(countryRepository.findOneBy).toHaveBeenCalled();
        expect(countryRepository.findOneBy).toBeCalledTimes(1);

        expect(countryRepository.create).not.toHaveBeenCalled();
        expect(countryRepository.create).toBeCalledTimes(0);

        expect(countryRepository.save).not.toHaveBeenCalled();
        expect(countryRepository.save).toBeCalledTimes(0);
      });
    });
  });

  describe('Remove', () => {
    describe('Successful Case', () => {
      it('should be delete country and return country', async () => {
        countryRepository.findOneBy.mockResolvedValue({
          id: 'uuid',
          createdAt: new Date(),
          name: 'brasil',
          flagUrl: 'url',
        } as CountryEntity);

        countryRepository.delete.mockResolvedValue({ affected: 1, raw: [] });

        const serviceResponse = await service.remove('uuid');

        expect(serviceResponse).toBeDefined();

        expect(serviceResponse).toHaveProperty('id');
        expect(serviceResponse).toHaveProperty('name');
        expect(serviceResponse).toHaveProperty('flagUrl');
        expect(serviceResponse).toHaveProperty('createdAt');

        expect(countryRepository.findOneBy).toHaveBeenCalled();
        expect(countryRepository.findOneBy).toBeCalledTimes(1);

        expect(countryRepository.delete).toHaveBeenCalled();
        expect(countryRepository.delete).toBeCalledTimes(1);
      });
    });

    describe('Error Case', () => {
      it('should be throw a HttpException if not find some country', async () => {
        countryRepository.findOneBy.mockResolvedValue(null);
        const serviceResponse = service.remove('uuid');

        await expect(serviceResponse).rejects.toBeInstanceOf(HttpException);
        await expect(serviceResponse).rejects.toThrow(
          new HttpException('Country not found', HttpStatus.NOT_FOUND),
        );

        expect(countryRepository.findOneBy).toHaveBeenCalled();
        expect(countryRepository.findOneBy).toBeCalledTimes(1);

        expect(countryRepository.delete).not.toHaveBeenCalled();
        expect(countryRepository.delete).toBeCalledTimes(0);
      });

      it('should be throw a HttpException if not affected', async () => {
        countryRepository.findOneBy.mockResolvedValue({
          id: 'uuid',
          createdAt: new Date(),
          name: 'brasil',
          flagUrl: 'url',
        } as CountryEntity);

        countryRepository.delete.mockResolvedValue({ affected: 0, raw: [] });

        const serviceResponse = service.remove('uuid');

        await expect(serviceResponse).rejects.toBeInstanceOf(HttpException);
        await expect(serviceResponse).rejects.toThrow(
          new HttpException('Not Modified', HttpStatus.NOT_MODIFIED),
        );

        expect(countryRepository.findOneBy).toHaveBeenCalled();
        expect(countryRepository.findOneBy).toBeCalledTimes(1);

        expect(countryRepository.delete).toHaveBeenCalled();
        expect(countryRepository.delete).toBeCalledTimes(1);
      });
    });
  });
});
