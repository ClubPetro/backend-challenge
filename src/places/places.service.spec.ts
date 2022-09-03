import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
    createBody,
    mockCountryMethods,
    mockPlaceRepoMethods,
    mockPlaceResponse,
    placeEntityList,
    placeId,
    placeUpdated,
    updateBody,
} from '../../test/helpers';
import { DataSource, Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { Place } from './entities/place.entity';
import { PlacesService } from './places.service';

describe('PlacesService', () => {
    let service: PlacesService;
    let repository: Repository<Place>;
    let countryRepository: Repository<Country>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlacesService,
                {
                    provide: DataSource,
                    useValue: {},
                },
                {
                    provide: getRepositoryToken(Place),
                    useValue: mockPlaceRepoMethods(),
                },
                {
                    provide: getRepositoryToken(Country),
                    useValue: mockCountryMethods(),
                },
            ],
        }).compile();

        service = module.get<PlacesService>(PlacesService);
        repository = module.get(getRepositoryToken(Place));
        countryRepository = module.get(getRepositoryToken(Country));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
        expect(countryRepository).toBeDefined();
    });

    describe('create', () => {
        it('should return a create a place', async () => {
            expect(await service.create(createBody)).toEqual(
                mockPlaceResponse(),
            );
            expect(repository.create).toBeCalledTimes(1);
            expect(repository.save).toBeCalledTimes(1);
        });
    });

    describe('findAll', () => {
        it('should return a list of places', async () => {
            expect(await service.findAll()).toEqual(placeEntityList);
            expect(repository.find).toBeCalledTimes(1);
        });
    });

    describe('findOne', () => {
        it('should return a place by id', async () => {
            repository.findOne(mockPlaceResponse());
            expect(await service.findOne(placeId)).toStrictEqual(
                mockPlaceResponse(),
            );
        });

        it('should return not found exception when place not exists', () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            expect(service.findOne(placeId)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a place', async () => {
            jest.spyOn(repository, 'save').mockResolvedValueOnce(placeUpdated);
            expect(await service.update(placeId, updateBody)).toEqual(
                placeUpdated,
            );
        });

        it('should throw an exception', () => {
            jest.spyOn(repository, 'preload').mockResolvedValue(null);
            expect(service.update(placeId, updateBody)).rejects.toThrowError(
                NotFoundException,
            );
        });
    });

    describe('remove', () => {
        it('should delete a place', async () => {
            expect(await service.remove(placeId)).toBeUndefined();
            expect(repository.findOne).toHaveBeenCalledTimes(1);
        });

        it('should return not found exception when place already removed', async () => {
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);
            expect(service.remove(placeId)).rejects.toThrowError(
                NotFoundException,
            );
        });
    });
});
