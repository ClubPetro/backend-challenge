import { Test, TestingModule } from '@nestjs/testing';
import {
    createBody,
    mockPlaceMethods,
    mockPlaceResponse,
    placeEntityList,
    placeId,
    placeUpdated,
    updateBody,
} from '../../test/helpers';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

describe('PlacesController', () => {
    let controller: PlacesController;
    let service: PlacesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlacesController],
            providers: [
                {
                    provide: PlacesService,
                    useValue: mockPlaceMethods(),
                },
            ],
        }).compile();

        controller = module.get<PlacesController>(PlacesController);
        service = module.get<PlacesService>(PlacesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a new place', async () => {
            const place = await controller.create(createBody);

            expect(place).toEqual(mockPlaceResponse());
            expect(service.create).toHaveBeenCalledTimes(1);
            expect(service.create).toHaveBeenCalledWith(createBody);
        });

        it('should throw an exception', () => {
            jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
            expect(controller.create(createBody)).rejects.toThrowError();
        });
    });

    describe('findAll', () => {
        it('should return list of places', async () => {
            const places = await controller.findAll();
            expect(places).toEqual(placeEntityList);
            expect(typeof places).toEqual('object');
            expect(service.findAll).toHaveBeenCalledTimes(1);
        });

        it('should throw an exception', () => {
            jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
            expect(controller.findAll()).rejects.toThrowError();
        });
    });

    describe('findOne', () => {
        it('should return a place by id', async () => {
            const result = await controller.findOne(placeId);

            expect(result).toEqual(mockPlaceResponse());
            expect(service.findOne).toHaveBeenCalledTimes(1);
            expect(service.findOne).toHaveBeenCalledWith(placeId);
        });

        it('should throw an exception', () => {
            jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
            expect(controller.findOne(placeId)).rejects.toThrowError();
        });
    });

    describe('update', () => {
        it('should update a place', async () => {
            const result = await controller.update(placeId, updateBody);

            expect(result).toEqual(placeUpdated);
            expect(service.update).toHaveBeenCalledTimes(1);
            expect(service.update).toHaveBeenCalledWith(placeId, updateBody);
        });

        it('should throw an exception', () => {
            jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());
            expect(
                controller.update(placeId, updateBody),
            ).rejects.toThrowError();
        });
    });

    describe('remove', () => {
        it('should remove a place', async () => {
            const response = await controller.remove(placeId);
            expect(response).toBeUndefined();
        });

        it('should throw an exception', () => {
            jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());
            expect(controller.remove(placeId)).rejects.toThrowError();
        });
    });
});
