import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TravelsService } from './travels.service';
import {
  MockType,
  repositoryMockFactory,
} from '../../utils/repository-mock.utils';
import { MongoRepository } from 'typeorm';
import { Travel } from './travel.entity';

describe('TravelsService', () => {
  let service: TravelsService;
  let repositoryMock: MockType<MongoRepository<Travel>>;
  const travel = {
    id: '62ec983a0640cfc7c378564f',
    country: 'Brasil',
    regional: 'Fortaleza',
    goal: '2022-08-05T04:23:04.947Z',
    flagUrl: 'http://test.com/image.jpg',
    createdAt: '2022-08-05T04:23:04.947Z',
    updatedAt: '2022-08-05T04:23:04.947Z',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravelsService,
        {
          provide: getRepositoryToken(Travel),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<TravelsService>(TravelsService);
    repositoryMock = module.get(getRepositoryToken(Travel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all travels', async () => {
    const travels = [travel];
    repositoryMock.find.mockReturnValue(travels);
    expect(await service.get()).toEqual(travels);
    expect(repositoryMock.find).toHaveBeenCalledWith({
      order: { goal: 'ASC' },
    });
  });

  it('should find a travel', async () => {
    repositoryMock.findOne.mockReturnValue(travel);
    expect(await service.getOne(travel.id)).toEqual(travel);
    expect(repositoryMock.findOne).toHaveBeenCalledWith(travel.id);
  });

  it('should create a travel', async () => {
    repositoryMock.save.mockReturnValue(travel);
    expect(await service.create(travel)).toEqual(undefined);
    expect(repositoryMock.save).toBeCalled();
  });

  it('should update a travel', async () => {
    repositoryMock.save.mockReturnValue(travel);
    expect(await service.update(travel.id, travel)).toEqual(undefined);
    expect(repositoryMock.save).toBeCalled();
  });

  it('should delete a travel', async () => {
    repositoryMock.delete.mockReturnValue(travel);
    expect(await service.delete(travel.id)).toEqual(undefined);
    expect(repositoryMock.delete).toBeCalled();
  });
});
