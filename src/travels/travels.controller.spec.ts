import { Test, TestingModule } from '@nestjs/testing';
import { TravelsController } from './travels.controller';
import { TravelsService } from './travels.service';

describe('TravelsController', () => {
  let controller: TravelsController;
  let service: TravelsService;
  const travel = {
    id: '62ec983a0640cfc7c378564f',
    country: 'Brasil',
    regional: 'Fortaleza',
    goal: '2022-08-05T04:23:04.947Z',
    flagUrl: 'http://test.com/image.jpg',
    createdAt: '2022-08-05T04:23:04.947Z',
    updatedAt: '2022-08-05T04:23:04.947Z',
  };
  const serviceMock = {
    get: jest.fn(),
    getOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravelsController,
        {
          provide: TravelsService,
          useValue: {
            get: jest
              .fn()
              .mockImplementationOnce(() => Promise.resolve([travel])),
            getOne: jest
              .fn()
              .mockImplementationOnce(() => Promise.resolve(travel)),
            create: jest.fn().mockImplementationOnce(() => Promise.resolve()),
            update: jest.fn().mockImplementationOnce(() => Promise.resolve()),
            delete: jest.fn().mockImplementationOnce(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    controller = module.get<TravelsController>(TravelsController);
    service = module.get<TravelsService>(TravelsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all travels', async () => {
    const travels = [travel];
    serviceMock.get();
    expect(await service.get()).toEqual(travels);
    expect(serviceMock.get).toHaveBeenCalledWith();
  });

  it('should find a travel', async () => {
    serviceMock.getOne(travel.id);
    expect(await service.getOne(travel.id)).toEqual(travel);
    expect(serviceMock.getOne).toHaveBeenCalledWith(travel.id);
  });

  it('should create a travel', async () => {
    serviceMock.create(travel);
    expect(await service.create(travel)).toEqual(undefined);
    expect(serviceMock.create).toBeCalled();
  });

  it('should update a travel', async () => {
    serviceMock.update(travel.id);
    expect(await service.update(travel.id, travel)).toEqual(undefined);
    expect(serviceMock.update).toBeCalled();
  });

  it('should delete a travel', async () => {
    serviceMock.delete(travel.id);
    expect(await service.delete(travel.id)).toEqual(undefined);
    expect(serviceMock.delete).toBeCalled();
  });
});
