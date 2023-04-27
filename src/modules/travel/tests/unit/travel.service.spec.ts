import { Test, TestingModule } from '@nestjs/testing';
import { TravelService } from '../../travel.service';
import { TravelRepository } from '../../repositories/travel.repository';
import { Travel } from '../../entities/travel.entity';
import { PaginationResultDTO } from '../../../../utils/dto/pagination-result.dto';
import { SuccessResponseDTO } from '../../../../utils/dto/success-response.dto';
import { CreateTravelDTO } from '../../dto/create-travel.dto';
import { UpdateTravelDTO } from '../../dto/update-travel.dto';

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
  total: travelList.length,
  page: 1,
  rows: 100,
};

const newTravel: Partial<Travel> = {
  id: 2,
  country: 'Brasil',
  goal: '12/2023',
  flagUrl: 'bandeira_brasil.png',
  locale: 'Rio de Janeiro',
  userId: 1,
};

const updatedTravel: Partial<Travel> = {
  id: 1,
  country: 'Brasil',
  goal: '04/2024',
  flagUrl: 'bandeira_brasil.png',
  locale: 'Rio de Janeiro',
  userId: 1,
};

const successResponseDTO = new SuccessResponseDTO();

describe('Unit Test | TravelService', () => {
  let travelService: TravelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravelService,
        {
          provide: TravelRepository,
          useValue: {
            listTravels: jest.fn().mockResolvedValue(paginatedResult),
            findTravel: jest.fn().mockResolvedValue(travelList[0]),
            findDuplicateTravel: jest.fn().mockResolvedValue(undefined),
            updateTravel: jest.fn().mockResolvedValue(updatedTravel),
            createTravel: jest.fn().mockResolvedValue(newTravel),
            deleteTravel: jest.fn().mockResolvedValue(successResponseDTO),
          },
        },
      ],
    }).compile();

    travelService = module.get<TravelService>(TravelService);
  });

  it('service should be defined', () => {
    expect(travelService).toBeDefined();
  });

  describe('create', () => {
    it('should return a new travel', async () => {
      const body: CreateTravelDTO = {
        country: 'Brasil',
        goal: '12/2023',
        flagUrl: 'bandeira_brasil.png',
        locale: 'Rio de Janeiro',
        userId: 1,
      };
      const result = await travelService.create(body);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...createdTravel } = result;
      expect(typeof result).toEqual('object');
      expect(createdTravel.country).toEqual(newTravel.country);
      expect(createdTravel.createdAt).toBeInstanceOf(Date);
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
      expect(travelService.create(body)).rejects.toThrowError();
    });
  });

  describe('list', () => {
    it('should return a list of travels', async () => {
      const result = await travelService.list({
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
        travelService.list({ page: 1, rows: 100, userId: 1 }),
      ).rejects.toThrowError();
    });
  });

  describe('find', () => {
    it('should return a travel', async () => {
      const result = await travelService.find(1, 1);
      expect(result).toEqual(travelList[0]);
      expect(typeof result).toEqual('object');
    });

    it('should return an error', async () => {
      jest.spyOn(travelService, 'find').mockRejectedValueOnce(new Error());
      expect(travelService.find(1, 1)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should return a updated travel', async () => {
      const body: UpdateTravelDTO = {
        goal: '04/2024',
        locale: 'Rio de Janeiro',
      };
      const result = await travelService.update(1, body);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...createdTravel } = result;
      expect(typeof result).toEqual('object');
      expect(createdTravel.goal).toEqual(updatedTravel.goal);
      expect(createdTravel.locale).toEqual(updatedTravel.locale);
      expect(createdTravel.updatedAt).toBeInstanceOf(Date);
    });

    it('should return an error', async () => {
      const body: UpdateTravelDTO = {
        goal: '02/2024',
        locale: 'Rio de Janeiro',
      };
      jest.spyOn(travelService, 'update').mockRejectedValueOnce(new Error());
      expect(travelService.update(1, body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should return a success response', async () => {
      const result = await travelService.delete(1, 1);
      expect(result).toEqual(successResponseDTO);
      expect(typeof result).toEqual('object');
    });

    it('should return an error', async () => {
      jest.spyOn(travelService, 'delete').mockRejectedValueOnce(new Error());
      expect(travelService.delete(1, 1)).rejects.toThrowError();
    });
  });
});
