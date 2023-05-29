import { Test, TestingModule } from '@nestjs/testing';
import { ObjectiveService } from './objective.service';
import { CountryService } from '../country/country.service';
import { ObjectiveEntity } from './entities/objective.entity';
import { Repository } from 'typeorm';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CountryEntity } from '../country/entities/country.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ObjectiveService', () => {
  let service: ObjectiveService;
  let objectiveRepository: DeepMocked<Repository<ObjectiveEntity>>;
  let countryService: DeepMocked<CountryService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObjectiveService,
        {
          provide: getRepositoryToken(ObjectiveEntity),
          useValue: createMock<Repository<ObjectiveEntity>>(),
        },
        {
          provide: CountryService,
          useValue: createMock<CountryService>(),
        },
      ],
    }).compile();

    service = module.get<ObjectiveService>(ObjectiveService);
    objectiveRepository = module.get(getRepositoryToken(ObjectiveEntity));
    countryService = module.get<DeepMocked<CountryService>>(CountryService);
  });

  const countryValue = {
    id: 'uuid',
    createdAt: new Date(),
    name: 'brasil',
    flagUrl: 'url',
  } as CountryEntity;

  const objectiveValue = {
    id: 'ac8976eb-43eb-453c-b227-d925d4a7f476',
    createdAt: new Date(),
    goalPlace: 'cristo redentor',
    goalDate: new Date(),
    country: countryValue,
  } as ObjectiveEntity;

  describe('Create', () => {
    describe('Successful Case', () => {
      it('should be create objective and return objective created', async () => {
        const payload = {
          goalPlace: 'Disney',
          goalDate: '02/2024',
          countryId: 'uuid',
        };

        countryService.findOneById.mockResolvedValue(countryValue);
        objectiveRepository.findOne.mockResolvedValue(null);
        objectiveRepository.create.mockReturnValue(objectiveValue);
        objectiveRepository.save.mockResolvedValue(objectiveValue);

        const serviceResponse = await service.create(payload);

        expect(serviceResponse).toHaveProperty('id');
        expect(serviceResponse).toHaveProperty('goalPlace');
        expect(serviceResponse).toHaveProperty('goalDate');
        expect(serviceResponse).toHaveProperty('createdAt');
        expect(serviceResponse).toHaveProperty('country');

        expect(serviceResponse.country).toHaveProperty('id');
        expect(serviceResponse.country).toHaveProperty('name');
        expect(serviceResponse.country).toHaveProperty('flagUrl');
        expect(serviceResponse.country).toHaveProperty('createdAt');

        expect(countryService.findOneById).toHaveBeenCalled();
        expect(countryService.findOneById).toBeCalledTimes(1);

        expect(objectiveRepository.findOne).toHaveBeenCalled();
        expect(objectiveRepository.findOne).toBeCalledTimes(1);

        expect(objectiveRepository.create).toHaveBeenCalled();
        expect(objectiveRepository.create).toBeCalledTimes(1);

        expect(objectiveRepository.save).toHaveBeenCalled();
        expect(objectiveRepository.save).toBeCalledTimes(1);
      });
    });

    describe('Error Case', () => {
      it('should be throw a HttpException if not found country', async () => {
        const payload = {
          goalPlace: 'Disney',
          goalDate: '02/2024',
          countryId: 'uuid',
        };

        countryService.findOneById.mockResolvedValue(null);

        const serviceResponse = service.create(payload);

        await expect(serviceResponse).rejects.toBeInstanceOf(HttpException);
        await expect(serviceResponse).rejects.toThrow(
          new HttpException('Country not found', HttpStatus.NOT_FOUND),
        );

        expect(countryService.findOneById).toHaveBeenCalled();
        expect(countryService.findOneById).toBeCalledTimes(1);

        expect(objectiveRepository.findOne).not.toHaveBeenCalled();
        expect(objectiveRepository.findOne).toBeCalledTimes(0);

        expect(objectiveRepository.create).not.toHaveBeenCalled();
        expect(objectiveRepository.create).toBeCalledTimes(0);

        expect(objectiveRepository.save).not.toHaveBeenCalled();
        expect(objectiveRepository.save).toBeCalledTimes(0);
      });

      it('should be throw a HttpException if already exits goal place', async () => {
        const payload = {
          goalPlace: 'Disney',
          goalDate: '02/2024',
          countryId: 'uuid',
        };

        countryService.findOneById.mockResolvedValue(countryValue);
        objectiveRepository.findOne.mockResolvedValue(objectiveValue);

        const serviceResponse = service.create(payload);

        await expect(serviceResponse).rejects.toBeInstanceOf(HttpException);
        await expect(serviceResponse).rejects.toThrow(
          new HttpException(
            'Goal for this Country already exists',
            HttpStatus.CONFLICT,
          ),
        );

        expect(countryService.findOneById).toHaveBeenCalled();
        expect(countryService.findOneById).toBeCalledTimes(1);

        expect(objectiveRepository.findOne).toHaveBeenCalled();
        expect(objectiveRepository.findOne).toBeCalledTimes(1);

        expect(objectiveRepository.create).not.toHaveBeenCalled();
        expect(objectiveRepository.create).toBeCalledTimes(0);

        expect(objectiveRepository.save).not.toHaveBeenCalled();
        expect(objectiveRepository.save).toBeCalledTimes(0);
      });
    });
  });

  describe('Find All', () => {
    describe('Successful Case', () => {
      it('should be return all objective paginated with no page sender', async () => {
        objectiveRepository.findAndCount.mockResolvedValue([
          [objectiveValue],
          1,
        ]);
        const serviceResponse = await service.findAll({});

        expect(serviceResponse).toBeDefined();
        expect(serviceResponse).toHaveProperty('data');
        expect(serviceResponse).toHaveProperty('numberTotalPage', 1);

        expect(Array.isArray(serviceResponse.data)).toBeTruthy();
        expect(serviceResponse.data.length).toBeGreaterThan(0);

        const { data } = serviceResponse;

        for (const objective of data) {
          expect(objective).toHaveProperty('id');
          expect(objective).toHaveProperty('goalPlace');
          expect(objective).toHaveProperty('goalDate');
          expect(objective).toHaveProperty('createdAt');
          expect(objective).toHaveProperty('country');

          expect(objective.country).toHaveProperty('id');
          expect(objective.country).toHaveProperty('name');
          expect(objective.country).toHaveProperty('flagUrl');
          expect(objective.country).toHaveProperty('createdAt');
        }

        expect(objectiveRepository.findAndCount).toHaveBeenCalled();
        expect(objectiveRepository.findAndCount).toBeCalledTimes(1);
      });

      it('should be return empty array objective paginated with page 2', async () => {
        objectiveRepository.findAndCount.mockResolvedValue([[], 1]);
        const serviceResponse = await service.findAll({ page: '2' });

        expect(serviceResponse).toBeDefined();
        expect(serviceResponse).toHaveProperty('data');
        expect(serviceResponse).toHaveProperty('numberTotalPage', 1);

        expect(Array.isArray(serviceResponse.data)).toBeTruthy();
        expect(serviceResponse.data.length).toEqual(0);

        expect(objectiveRepository.findAndCount).toHaveBeenCalled();
        expect(objectiveRepository.findAndCount).toBeCalledTimes(1);
      });
    });
  });
  describe('Remove', () => {
    describe('Successful Case', () => {
      it('should be delete objective and return objective deleted', async () => {
        objectiveRepository.findOneBy.mockResolvedValue(objectiveValue);
        objectiveRepository.delete.mockResolvedValue({ affected: 1, raw: [] });

        const serviceResponse = await service.remove('uuid');

        expect(serviceResponse).toBeDefined();
        expect(serviceResponse).toHaveProperty('id');
        expect(serviceResponse).toHaveProperty('goalPlace');
        expect(serviceResponse).toHaveProperty('goalDate');
        expect(serviceResponse).toHaveProperty('createdAt');

        expect(objectiveRepository.findOneBy).toHaveBeenCalled();
        expect(objectiveRepository.findOneBy).toBeCalledTimes(1);

        expect(objectiveRepository.delete).toHaveBeenCalled();
        expect(objectiveRepository.delete).toBeCalledTimes(1);
      });
    });

    describe('Error Case', () => {
      it('should be throw HttpException if not found Objective', async () => {
        objectiveRepository.findOneBy.mockResolvedValue(objectiveValue);
        objectiveRepository.delete.mockResolvedValue({ affected: 0, raw: [] });

        const serviceResponse = service.remove('uuid');

        await expect(serviceResponse).rejects.toBeInstanceOf(HttpException);
        await expect(serviceResponse).rejects.toThrow(
          new HttpException('Not Modified', HttpStatus.NOT_MODIFIED),
        );

        expect(objectiveRepository.findOneBy).toHaveBeenCalled();
        expect(objectiveRepository.findOneBy).toBeCalledTimes(1);

        expect(objectiveRepository.delete).toHaveBeenCalled();
        expect(objectiveRepository.delete).toBeCalledTimes(1);
      });

      it('should be throw HttpException if delete not has affected', async () => {
        objectiveRepository.findOneBy.mockResolvedValue(null);

        const serviceResponse = service.remove('uuid');

        await expect(serviceResponse).rejects.toBeInstanceOf(HttpException);
        await expect(serviceResponse).rejects.toThrow(
          new HttpException('Objective not found', HttpStatus.NOT_FOUND),
        );

        expect(objectiveRepository.findOneBy).toHaveBeenCalled();
        expect(objectiveRepository.findOneBy).toBeCalledTimes(1);

        expect(objectiveRepository.delete).not.toHaveBeenCalled();
        expect(objectiveRepository.delete).toBeCalledTimes(0);
      });
    });
  });
});
