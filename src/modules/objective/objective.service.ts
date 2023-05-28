import { Injectable } from '@nestjs/common';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';

@Injectable()
export class ObjectiveService {
  create(createObjectiveDto: CreateObjectiveDto) {
    return 'This action adds a new objective';
  }

  findAll() {
    return `This action returns all objective`;
  }

  findOne(id: number) {
    return `This action returns a #${id} objective`;
  }

  update(id: number, updateObjectiveDto: UpdateObjectiveDto) {
    return `This action updates a #${id} objective`;
  }

  remove(id: number) {
    return `This action removes a #${id} objective`;
  }
}
