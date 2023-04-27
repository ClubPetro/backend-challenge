import { Test, TestingModule } from '@nestjs/testing';
import { TravelController } from '../../travel.controller';
import { TravelService } from '../../travel.service';
import { Travel } from '../../entities/travel.entity';
import { PaginationResultDTO } from '../../../../utils/dto/pagination-result.dto';
import { CreateTravelDTO } from '../../dto/create-travel.dto';
import { UpdateTravelDTO } from '../../dto/update-travel.dto';
import { SuccessResponseDTO } from '../../../../utils/dto/success-response.dto';

const travelList: Travel[] = [
  new Travel({
    id: 1,
    country: 'Brasil',
    goal: '11/2023',
    flagUrl: 'bandeira_brasil.png',
    locale: 'São Paulo',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1,
  }),
];

const paginatedResult: PaginationResultDTO = {
  data: travelList,
  page: 1,
  rows: 100,
  total: travelList.length,
};

const newTravel: Partial<Travel> = {
  id: 2,
  country: 'Brasil',
  goal: '12/2023',
  flagUrl: 'bandeira_brasil.png',
  locale: 'Rio de Janeiro',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 1,
};

const updatedTravel: Partial<Travel> = {
  id: 2,
  country: 'Brasil',
  goal: '02/2024',
  flagUrl: 'bandeira_brasil.png',
  locale: 'Rio de Janeiro',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 1,
};

const successResponseDTO = new SuccessResponseDTO();

describe('Unit Test | TravelController', () => {
  let travelController: TravelController;
  let travelService: TravelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelController],
      providers: [
        {
          provide: TravelService,
          useValue: {
            list: jest.fn().mockResolvedValue(paginatedResult),
            find: jest.fn().mockResolvedValue(travelList[0]),
            create: jest.fn().mockResolvedValue(newTravel),
            update: jest.fn().mockResolvedValue(updatedTravel),
            delete: jest.fn().mockResolvedValue(successResponseDTO),
          },
        },
      ],
    }).compile();

    travelController = module.get<TravelController>(TravelController);
    travelService = module.get<TravelService>(TravelService);
  });

  it('controller should be defined', () => {
    expect(travelController).toBeDefined();
  });
  it('service should be defined', () => {
    expect(travelService).toBeDefined();
  });

  describe('list (GET /travels)', () => {
    it('should return a travel list', async () => {
      const result = await travelController.list({
        page: 1,
        rows: 100,
        userId: 1,
      });
      expect(result).toEqual(paginatedResult);
      expect(typeof result).toEqual('object');
    });

    it('should return an error', async () => {
      jest.spyOn(travelService, 'list').mockRejectedValueOnce(new Error());
      expect(
        travelController.list({ page: 1, rows: 100, userId: 1 }),
      ).rejects.toThrowError();
    });
  });

  describe('find (GET /travel/:id)', () => {
    it('should return a travel', async () => {
      const result = await travelController.find(1, 1);
      expect(result).toEqual(travelList[0]);
      expect(typeof result).toEqual('object');
    });

    it('should return an error', async () => {
      jest.spyOn(travelService, 'find').mockRejectedValueOnce(new Error());
      expect(travelController.find(1, 1)).rejects.toThrowError();
    });
  });

  describe('create (POST /travel)', () => {
    it('should return a new travel', async () => {
      const body: CreateTravelDTO = {
        country: 'Brasil',
        goal: '12/2023',
        flagUrl: 'bandeira_brasil.png',
        locale: 'Rio de Janeiro',
        userId: 1,
      };
      const result = await travelController.create(body);
      expect(result).toEqual(newTravel);
      expect(typeof result).toEqual('object');
      expect(travelService.create).toHaveBeenCalledWith(body);
    });

    it('should return an error', async () => {
      const body: CreateTravelDTO = {
        country: 'Brasil',
        goal: '12/2023',
        flagUrl: 'bandeira_brasil.png',
        locale: 'Rio de Janeiro',
        userId: 1,
      };
      jest.spyOn(travelService, 'create').mockRejectedValueOnce(new Error());
      expect(travelController.create(body)).rejects.toThrowError();
    });
  });

  describe('update (PUT /travel/:id)', () => {
    it('should return a updated travel', async () => {
      const body: UpdateTravelDTO = {
        goal: '04/2024',
        locale: 'Rio de Janeiro',
      };
      const result = await travelController.update(2, body);
      expect(result).toEqual(updatedTravel);
      expect(typeof result).toEqual('object');
      expect(travelService.update).toHaveBeenCalledWith(2, body);
    });

    it('should return an error', async () => {
      const body: UpdateTravelDTO = {
        goal: '02/2024',
        locale: 'Rio de Janeiro',
      };
      jest.spyOn(travelService, 'update').mockRejectedValueOnce(new Error());
      expect(travelController.update(2, body)).rejects.toThrowError();
    });
  });

  describe('delete (DELETE /travel/:id)', () => {
    it('should return a success response', async () => {
      const result = await travelController.delete(2, 1);
      expect(result).toEqual(successResponseDTO);
      expect(typeof result).toEqual('object');
    });

    it('should return an error', async () => {
      jest.spyOn(travelService, 'delete').mockRejectedValueOnce(new Error());
      expect(travelController.delete(2, 1)).rejects.toThrowError();
    });
  });
});
