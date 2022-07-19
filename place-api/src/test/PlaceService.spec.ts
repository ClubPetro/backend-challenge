import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../AppModule'
import PlaceService from '../service/PlaceService'
import { PlaceRepository } from '../repository/PlaceRepository'
import { PlaceMock } from './mocks/PlaceMock'
import { PlaceUpdateMock } from './mocks/PlaceUpdateMock'

describe('PlaceService', () => {
    let ps: PlaceService
    let pr: PlaceRepository
    let place

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        ps = module.get<PlaceService>(PlaceService)
        pr = module.get<PlaceRepository>(PlaceRepository)

        Date.prototype.getTimezoneOffset = jest.fn(() => 180)
        Date.prototype.valueOf = jest.fn(() => 1625219607232)
    })

    describe('getAllPlaces()', () => {
        it('Request get all places', async () => {
            const findAllPlaces = await ps.getAll()
            expect(findAllPlaces)
        }, 5000)
    })
    describe('createPlace()', () => {
        it('Request save place', async () => {
            place = await ps.executeSave(PlaceMock)
            const findPlace = await pr.findPlace(place)
            expect(place.country).toBe(findPlace.country)
            expect(place.place).toBe(findPlace.place)
            expect(place.goal).toBe(findPlace.goal)
            expect(place.urlFlag).toBe(findPlace.urlFlag)
        }, 5000)
    })

    describe('findPlaceById()', () => {
        it('Request get place ById', async () => {
            place = await pr.findPlace(PlaceMock)
            const findPlace = await pr.findByPlaceById(place._id)
            expect(place.country).toBe(findPlace.country)
            expect(place.place).toBe(findPlace.place)
            expect(place.goal).toBe(findPlace.goal)
            expect(place.urlFlag).toBe(findPlace.urlFlag)
        }, 2000)
    })

    describe('updatePlace()', () => {
        it('Request update place ById', async () => {
            place = await pr.findPlace(PlaceMock)
            const placeUpdate = await pr.update(place._id, PlaceUpdateMock)
            expect(placeUpdate.country)
            expect(placeUpdate.place)
            expect(placeUpdate.goal)
        }, 5000)
    })

    describe('deletePlace()', () => {
        it('Request delete place ById', async () => {
            place = await pr.findPlace(PlaceUpdateMock)
            const placeDeleted = await pr.deleteById(place._id)
            expect(placeDeleted)
        }, 2000)
    })
})
