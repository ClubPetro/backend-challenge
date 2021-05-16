import { Injectable, NotFoundException } from '@nestjs/common';
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
    //cria um objeto com os atributos de place, e salva no banco de dados

    const place = new Place();
    const meta = data.meta.split('-');
    const metaMonth = Number(meta[1]);
    const metaYear = Number(meta[0]);

    place.country = data.country;
    place.url = data.url;
    place.location = data.location;
    place.meta = data.meta;

    //retorna o que foi salvo no banco de dados
    return this.placeRepository.save(place);
  }

  async getAll(): Promise<Place[]> {
    return await this.placeRepository.find({ order: { meta: 'ASC' } });
  }

  async getById(id: string): Promise<Place> {
    return await this.placeRepository.findOne(id);
  }

  async update(id: string, data: PlaceUpdateDto): Promise<Place> {
    const place = await this.placeRepository.findOne(id);
    if (place) {
      if (data.location) {
        place.location = data.location;
      }
      if (data.meta) {
        const meta = data.meta.split('-');
        const metaMonth = Number(meta[1]);
        const metaYear = Number(meta[0]);
        place.meta = `${metaMonth}-${metaYear}`;
      }
      return await this.placeRepository.save(place);
    } else {
      throw new NotFoundException(
        'Não foi encontrado o registro no banco de dados',
      );
    }
  }
}
