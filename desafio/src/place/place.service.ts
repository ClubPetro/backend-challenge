import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from 'src/place/places.entity';
import { Repository } from 'typeorm';
import { PlaceCreateDto } from './dto/place.create.dto';
import { PlaceUpdateDto } from './dto/place.update.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}

  async create(data: PlaceCreateDto): Promise<Place> {
    const place = new Place();
    const date = new Date();
    const meta = data.meta.split('-');
    const metaMonth = Number(meta[1]);
    const metaYear = Number(meta[0]);
    const location = await this.placeRepository.find({
      where: { location: data.location },
    });

    if (date.getFullYear() > metaYear || date.getMonth() + 1 > metaMonth) {
      throw new HttpException(
        'A data é inválida',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    location.forEach((l) => {
      if (l.country == data.country) {
        throw new ConflictException(
          'A meta para esta localidade para este país já existe',
        );
      }
    });

    place.country = data.country;
    place.url = data.url;
    place.location = data.location;
    place.meta = data.meta;

    return this.placeRepository.save(place);
  }

  async getAll(): Promise<Place[]> {
    return await this.placeRepository.find({ order: { meta: 'ASC' } });
  }

  async getById(id: string): Promise<Place> {
    const place = await this.placeRepository.findOne(id);
    if (!place) {
      throw new NotFoundException('Meta não encontrado');
    }
    return place;
  }

  async update(id: string, data: PlaceUpdateDto): Promise<Place> {
    const place = await this.getById(id);
    if (place) {
      if (data.location) {
        place.location = data.location;
      }
      if (data.meta) {
        const date = new Date();
        const meta = data.meta.split('-');
        const metaYear = Number(meta[0]);
        const metaMonth = Number(meta[1]);

        if (
          date.getFullYear() > metaYear ||
          (date.getFullYear() == metaYear && date.getMonth() + 1 >= metaMonth)
        ) {
          throw new HttpException(
            'A data é inválida',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        place.meta = data.meta;
      }
      return await this.placeRepository.save(place);
    } else {
      throw new NotFoundException(
        'Não foi encontrado o registro no banco de dados',
      );
    }
  }

  async delete(id: string): Promise<void> {
    const place = await this.placeRepository.findOne(id);
    if (place) {
      await this.placeRepository.delete(id);
    } else {
      throw new NotFoundException('Meta não encontrado');
    }
  }
}
