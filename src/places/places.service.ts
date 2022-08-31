import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place) private readonly repository: Repository<Place>,
    ) {}

    create(createPlaceDto: CreatePlaceDto) {
        const place = this.repository.create(createPlaceDto);
        return this.repository.save(place);
    }

    findAll() {
        return this.repository.find();
    }

    async findOne(id: string) {
        const place = await this.repository.findOne({ where: { id } });

        if (!place) {
            throw new NotFoundException(`Place #${id} not found`);
        }

        return place;
    }

    async update(id: string, updatePlaceDto: UpdatePlaceDto) {
        const place = await this.repository.preload({
            id,
            ...updatePlaceDto,
        });

        if (!place) {
            throw new NotFoundException(`Place #${id} not found`);
        }

        return this.repository.save(place);
    }

    async remove(id: string) {
        const place = await this.repository.findOneOrFail({ where: { id } });

        if (!place) {
            throw new NotFoundException(`Place #${id} not found`);
        }

        return this.repository.remove(place);
    }
}
