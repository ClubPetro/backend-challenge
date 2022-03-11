import { Injectable } from '@nestjs/common';
import { CreatePlaceDto } from '../dto/create-place.dto'
import { UpdatePlaceDto } from '../dto/update-place.dto';

@Injectable()
export class PlacesService {
  create(createPlaceDto: CreatePlaceDto) {
    return 'This action adds a new place';
  }

  findAll() {
    return `This action returns all places`;
  }

  findOne(id: number) {
    return `This action returns a #${id} place`;
  }

  update(id: number, updatePlaceDto: UpdatePlaceDto) {
    return `This action updates a #${id} place`;
  }

  remove(id: number) {
    return `This action removes a #${id} place`;
  }
}
