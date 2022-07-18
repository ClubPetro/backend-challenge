import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    Logger,
    ConflictException,
    BadRequestException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Place } from '../domain/model/Place'
import { DateUtils } from '../utils/date-utils'

@Injectable()
export class PlaceRepository {
    private logger = new Logger('Places')

    constructor(@InjectModel(Place.name) private placeModel: Model<Place>) {}

    async findAll(): Promise<Place[]> {
        if (!(await this.placeModel.find())) {
            throw new NotFoundException()
        }
        try {
            return await this.placeModel.find().sort({ goal: -1 })
        } catch (err) {
            this.logger.error('Error when looking for places', err.stack)
            throw new InternalServerErrorException()
        }
    }

    async findByPlaceById(id: string): Promise<Place> {
        // Validação caso o ID não exista
        try {
            await this.placeModel.findById(id).exec()
        } catch (err) {
            if (err.kind === 'ObjectId') {
                throw new NotFoundException('No location found for id!')
            }
            this.logger.error('Error updating place', err.stack)
            throw new InternalServerErrorException()
        }

        const place = await this.placeModel.findById(id).exec()
        return place
    }

    async findPlace(payload: Place): Promise<Place> {
        const response = await this.placeModel.findOne({
            country: payload.country,
            goal: payload.goal,
        })
        return response
    }

    async create(payload: Place) {
        // Validação caso já exista mesmo local em determinado país
        if (await this.findPlace(payload)) {
            throw new ConflictException('Place already registered!')
        } else {
            const validateDate = new DateUtils()
            const today = new Date()
            const dataCurrent = validateDate.formatDate(today, 'aaaa-mm')

            // Validação para não deixar cadastrar uma data inferior a o dia atual
            if (payload.goal < dataCurrent) {
                throw new BadRequestException(
                    'Reported date less than allow date for goal!',
                )
            }

            const date = new Date(
                new Date().valueOf() - new Date().getTimezoneOffset() * 60000,
            )
            payload.registerDate = date
            payload.lastModifyDate = date
            const placeCreate = new this.placeModel(payload)
            return placeCreate.save()
        }
    }

    async update(id: string, place: Place): Promise<Place> {
        // Validação caso o ID não exista
        try {
            await this.placeModel.findOne({
                _id: id,
            })
        } catch (err) {
            if (err.kind === 'ObjectId') {
                throw new NotFoundException('No location found for id!')
            }
            this.logger.error('Error updating place', err.stack)
            throw new InternalServerErrorException()
        }

        // Validação caso já exista mesmo local em determinado país
        if (await this.findPlace(place)) {
            throw new ConflictException('Place already registered!')
        }

        const validateDate = new DateUtils()
        const today = new Date()
        const dataCurrent = validateDate.formatDate(today, 'aaaa-mm')

        // Validação para não deixar cadastrar uma data inferior a o dia atual
        if (place.goal < dataCurrent) {
            throw new BadRequestException(
                'Reported date less than allow date for goal!',
            )
        }

        const date = new Date()
        place.lastModifyDate = new Date(
            date.valueOf() - date.getTimezoneOffset() * 60000,
        )
        const placeUpdate = await this.placeModel
            .findByIdAndUpdate(id, place)
            .exec()
        return placeUpdate
    }

    async deleteById(id: string) {
        // Validação caso o ID não exista
        try {
            await this.placeModel.findOne({
                _id: id,
            })
        } catch (err) {
            if (err.kind === 'ObjectId') {
                throw new NotFoundException('No location found for id!')
            }
            this.logger.error('Error updating place', err.stack)
            throw new InternalServerErrorException()
        }

        const placeDeleted = this.placeModel
            .findOneAndDelete({ _id: id })
            .exec()
        return (await placeDeleted).remove()
    }
}
