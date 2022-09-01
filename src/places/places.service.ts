import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import { formatGoal } from './helpers/date.helper';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place) private readonly repository: Repository<Place>,
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
    ) {}

    async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
        const country = await this.preloadCountry(createPlaceDto.country);
        const goal = formatGoal(createPlaceDto.goal);
        const place = this.repository.create({
            ...createPlaceDto,
            country,
            goal,
        });

        return this.repository.save(place);
    }

    findAll(): Promise<Place[]> {
        return this.repository.find({
            relations: ['country'],
            order: { goal: 'ASC' },
        });
    }

    async findOne(id: string): Promise<Place> {
        const place = await this.repository.findOne({
            relations: ['country'],
            where: { id },
        });

        if (!place) {
            throw new NotFoundException(`Place ${id} not found`);
        }

        return place;
    }

    async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
        if (updatePlaceDto.goal) {
            updatePlaceDto.goal = formatGoal(updatePlaceDto.goal);
        }

        const place = await this.repository.preload({
            id,
            ...updatePlaceDto,
        });

        if (!place) {
            throw new NotFoundException(`Place ${id} not found`);
        }

        return this.repository.save(place);
    }

    async remove(id: string): Promise<void> {
        const place = await this.repository.findOne({ where: { id } });

        if (!place) {
            throw new NotFoundException(`Place ${id} not found`);
        }

        this.repository.remove(place);
    }

    private async preloadCountry(name: string): Promise<Country> {
        const country = await this.countryRepository.findOne({
            where: { name },
        });

        if (!country) {
            throw new NotFoundException(`Country ${name} not exists`);
        }

        return country;
    }
}
