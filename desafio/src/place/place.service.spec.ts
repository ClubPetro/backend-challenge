import {
  ConflictException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import UsefulTests from '../common/test/UsefulTests';
import { PlaceService } from './place.service';
import { Place } from './places.entity';

describe('PlacesService', () => {
  let service: PlaceService;

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaceService,
        {
          provide: getRepositoryToken(Place),
          useValue: mockRepository,
        },
      ],
    }).compile();
    service = module.get<PlaceService>(PlaceService);
  });

  beforeEach(() => {
    mockRepository.save.mockReset();
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.delete.mockReset();
  });

  describe('create', () => {
    it('Deve retornar um erro quando a data for inválida', async () => {
      const place = UsefulTests.giveMeInvalidePlace();
      mockRepository.save.mockReturnValue(Error);
      await service.create(place).catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toMatchObject({
          message: 'A data é inválida',
        });
      });
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
    });

    it('Deve retornar um erro quando a data for inválida', async () => {
      const place = UsefulTests.giveMeInvalideMeta2();
      mockRepository.save.mockReturnValue(Error);
      await service.create(place).catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toMatchObject({
          message: 'A data é inválida',
        });
      });
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
    });

    it('Deve retornar um erro caso encontre uma localidade no mesmo país', async () => {
      const place = UsefulTests.giveMeValidPlace();
      mockRepository.find.mockReturnValueOnce([place]);
      await service.create(place).catch((error) => {
        expect(error).toBeInstanceOf(ConflictException);
      });
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Deve criar um lugar', async () => {
      const place = UsefulTests.giveMeValidPlace();
      mockRepository.save.mockReturnValue(place);
      mockRepository.find.mockReturnValue([]);
      const createdPlace = await service.create(place);
      expect(createdPlace).toMatchObject(place);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAll', () => {
    it('Deve listar todos os lugares', async () => {
      const place = UsefulTests.giveMeValidPlace();
      mockRepository.find.mockReturnValue([place, place, place]);
      const places = await service.getAll();
      expect(places).toHaveLength(3);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('Deve encontrar um lugar cadastrado', async () => {
      const place = UsefulTests.giveMeValidPlace();
      mockRepository.findOne.mockReturnValueOnce(place);
      const placeFound = await service.getById('1');
      expect(placeFound).toMatchObject({
        country: place.country,
        meta: place.meta,
      });
      expect(mockRepository.findOne).toHaveReturnedTimes(1);
    });
    it('Deve retornar um erro caso não encontre um lugar', async () => {
      mockRepository.findOne.mockReturnValueOnce(null);
      expect(service.getById('1')).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepository.findOne).toHaveReturnedTimes(1);
    });
  });

  describe('update', () => {
    it('Deve retornar um erro quando a data for inválida', async () => {
      let place = UsefulTests.giveMeValidPlace();
      const updatePlace = UsefulTests.giveMeInvalidUpdatePlace();
      mockRepository.findOne.mockReturnValue(place);
      place.location = updatePlace.location;
      place.meta = updatePlace.meta;
      await service.update('1', place).catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toMatchObject({
          message: 'A data é inválida',
        });
      });
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Deve retornar um erro quando a data for inválida', async () => {
      let place = UsefulTests.giveMeValidPlace();
      const updatePlace = UsefulTests.giveMeInvalideUpdateMeta();
      mockRepository.findOne.mockReturnValue(place);
      place.location = updatePlace.location;
      place.meta = updatePlace.meta;
      await service.update('1', place).catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
        expect(error).toMatchObject({
          message: 'A data é inválida',
        });
      });
      expect(mockRepository.save).toHaveBeenCalledTimes(0);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Deve atualizar o lugar e/ou a meta', async () => {
      let place = UsefulTests.giveMeValidPlace();
      const updatePlace = UsefulTests.giveMeUpdatePlace();
      mockRepository.findOne.mockReturnValue(place);
      place.location = updatePlace.location;
      place.meta = updatePlace.meta;
      mockRepository.save.mockReturnValue(place);
      const updatedPlace = await service.update('1', place);
      expect(updatedPlace.location).toEqual('Disney');
      expect(updatedPlace.meta).toEqual('2040-04');
      expect(mockRepository.findOne).toHaveReturnedTimes(1);
      expect(mockRepository.save).toHaveReturnedTimes(1);
    });
  });

  describe('delete', () => {
    it('Deve excluir um local', async () => {
      const place = UsefulTests.giveMeValidPlace();
      mockRepository.findOne.mockReturnValue(place);
      mockRepository.delete.mockReturnValue(place);
      const deletedPlace = await service.delete('1');
      expect(deletedPlace).toBeUndefined();
    });
  });
});
