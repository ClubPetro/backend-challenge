/* eslint-disable @typescript-eslint/no-unused-vars */
import { CacheModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { generateString, generateDate } from '@core/utils/data.generate';

import { Place } from '../../typeorm/entities/place.entity';

import { FakePlacesRepository } from '@modules/places/repositories/fake-places.repository';

import { ListPlacesService } from '@modules/places/services/list-places.service';
import { GetPlaceByIdService } from '@modules/places/services/get-place-by-id.service';
import { CreatePlaceService } from '@modules/places/services/create-place.service';
import { UpdatePartialPlaceService } from '@modules/places/services/update-partial-place.service';
import { DeletePlaceService } from '@modules/places/services/delete-place.service';
import { PlaceGoneService } from '@modules/places/services/place-gone.service';
import { PlaceDuplicatedService } from '@modules/places/services/place-duplicated.service';

import { PlacesController } from './places.controller';

describe('PlacesController', () => {
  let placesController: PlacesController;
  let listPlacesService: ListPlacesService;
  let getPlaceByIdService: GetPlaceByIdService;
  let createPlaceService: CreatePlaceService;
  let updatePartialPlaceService: UpdatePartialPlaceService;
  let deletePlaceService: DeletePlaceService;
  let placeGoneService: PlaceGoneService;
  let placeDuplicatedService: PlaceDuplicatedService;
  let fakePlacesRepository: FakePlacesRepository;

  beforeEach(async () => {
    // fakePlacesRepository = new FakePlacesRepository();
    // listPlacesService = new ListPlacesService(fakePlacesRepository);
    // getPlaceByIdService = new GetPlaceByIdService(fakePlacesRepository);
    // createPlaceService = new CreatePlaceService(fakePlacesRepository);
    // updatePartialPlaceService = new UpdatePartialPlaceService(
    //   fakePlacesRepository,
    // );
    // deletePlaceService = new DeletePlaceService(fakePlacesRepository);
    // placeGoneService = new PlaceGoneService(fakePlacesRepository);
    // placeDuplicatedService = new PlaceDuplicatedService(fakePlacesRepository);
    // placesController = new PlacesController(
    //   listPlacesService,
    //   getPlaceByIdService,
    //   createPlaceService,
    //   updatePartialPlaceService,
    //   deletePlaceService,
    //   placeGoneService,
    //   placeDuplicatedService,
    // );
    const moduleRef = await Test.createTestingModule({
      imports: [CacheModule.register({})],
      controllers: [PlacesController],
      providers: [
        {
          provide: 'PlacesRepositoryInterface',
          useClass: FakePlacesRepository,
        },
        ListPlacesService,
        GetPlaceByIdService,
        CreatePlaceService,
        UpdatePartialPlaceService,
        DeletePlaceService,
        PlaceGoneService,
        PlaceDuplicatedService,
      ],
    }).compile();
    listPlacesService = moduleRef.get<ListPlacesService>(ListPlacesService);
    getPlaceByIdService =
      moduleRef.get<GetPlaceByIdService>(GetPlaceByIdService);
    createPlaceService = moduleRef.get<CreatePlaceService>(CreatePlaceService);
    updatePartialPlaceService = moduleRef.get<UpdatePartialPlaceService>(
      UpdatePartialPlaceService,
    );
    deletePlaceService = moduleRef.get<DeletePlaceService>(DeletePlaceService);
    placeGoneService = moduleRef.get<PlaceGoneService>(PlaceGoneService);
    placeDuplicatedService = moduleRef.get<PlaceDuplicatedService>(
      PlaceDuplicatedService,
    );
    placesController = moduleRef.get<PlacesController>(PlacesController);
  });

  // let places: Place[];

  // beforeEach(async () => {
  //   for (let i = 0; i < 20; i++) {
  //     try {
  //       const place = await fakePlacesRepository.create({
  //         country: generateString(5),
  //         location: generateString(5),
  //         goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
  //         imageUrl: `http://${generateString(5)}.com.br`,
  //       });
  //       places.push(place);
  //     } catch (error) {
  //       // do nothing
  //     }
  //   }
  // });

  let place: Place;

  beforeEach(async () => {
    place = await placesController.create({
      country: generateString(5),
      location: generateString(5),
      goal: generateDate(new Date(2022, 0, 1), new Date(2030, 11, 1)),
      imageUrl: `http://${generateString(5)}.com.br`,
    });
  });

  describe('show', () => {
    it('should return an array of places', async () => {
      const result = await placesController.show();
      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('index', () => {
    it('should return a place by id', async () => {
      const result = await placesController.index(place.id);
      expect(result).toBeDefined();
    });
  });

  describe('update partial', () => {
    it('should update place', async () => {
      const updatePlace = {
        location: 'test2',
        goal: new Date(2022, 1, 1),
      };
      const result = await placesController.updatePartial(
        place.id,
        updatePlace,
      );
      expect(result).toBeDefined();
      expect(result).toMatchObject({
        ...updatePlace,
      });
    });
  });

  describe('delete', () => {
    it('should delete place by id', async () => {
      const result = await placesController.delete(place.id);
      expect(result).toBeUndefined();
    });
  });
});
