import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

describe('CountriesController', () => {
  let controller: CountriesController;
  let service: CountriesService;
  const country = {
    id: '62ec983a0640cfc7c378564f',
    name: 'Brasil',
  };
  const serviceMock = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        CountriesController,
        {
          provide: CountriesService,
          useValue: {
            get: jest
              .fn()
              .mockImplementationOnce(() => Promise.resolve([country])),
          },
        },
      ],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all countries', async () => {
    const countries = [country];
    serviceMock.get();
    expect(await service.get()).toEqual(countries);
    expect(serviceMock.get).toHaveBeenCalledWith();
  });
});
