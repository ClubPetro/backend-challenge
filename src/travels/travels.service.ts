import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Travel } from './travel.entity';

@Injectable()
export class TravelsService {
  constructor(
    @InjectRepository(Travel)
    private readonly travelsRepository: MongoRepository<Travel>,
  ) {}

  async get(): Promise<Travel[]> {
    return await this.travelsRepository.find();
  }

  async getOne(id: any): Promise<Travel> {
    if (!ObjectID.isValid(id)) {
      throw new NotFoundException();
    }
    return await this.travelsRepository.findOne(id);
  }

  async create(data: any): Promise<void> {
    const travel = new Travel({
      country: data.country,
      regional: data.regional,
      goal: new Date(data.goal),
      pictureUrl: data.pictureUrl,
    });
    await this.travelsRepository.save(travel);
  }

  async update(id: any, data: any): Promise<void> {
    const dataTravel = await this.getOne(id);

    if (!dataTravel) {
      throw new NotFoundException();
    }

    const travel: Travel = {
      ...dataTravel,
      regional: data.regional,
      goal: data.goal,
    };

    await this.travelsRepository.save(travel);
  }

  async delete(id: any): Promise<void> {
    const dataTravel = await this.getOne(id);

    if (!dataTravel) {
      throw new NotFoundException();
    }

    await this.travelsRepository.delete(id);
  }
}
