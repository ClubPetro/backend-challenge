import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Travel } from './travel.entity';
import { generateSlug } from '../../utils/slug.utils';

@Injectable()
export class TravelsService {
  constructor(
    @InjectRepository(Travel)
    private readonly travelsRepository: MongoRepository<Travel>,
  ) {}

  async get(): Promise<Travel[]> {
    return await this.travelsRepository.find({ order: { goal: 'ASC' } });
  }

  async getOne(id: any): Promise<Travel> {
    if (!ObjectID.isValid(id)) {
      throw new NotFoundException();
    }
    return await this.travelsRepository.findOne(id);
  }

  async create(data: any): Promise<void> {
    const checkIfExistRegional = await this.travelsRepository.findOne({
      where: { country: data.country, regional: data.regional },
    });

    if (checkIfExistRegional) {
      throw new BadRequestException('Regional was not been created');
    }

    const travel = new Travel({
      country: data.country,
      regional: data.regional,
      goal: new Date(data.goal),
      pictureUrl: `https://aimore.net/band/${generateSlug(data.country)}.jpg`,
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
