import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Travel } from '../entities/travel.entity';
import { UpdateTravelDTO } from '../dto/update-travel.dto';
import { CreateTravelDTO } from '../dto/create-travel.dto';
import { TravelRepositoryInterface } from './travel-repository.interface';
import { PaginationResultDTO } from '../../../utils/dto/pagination-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Utils } from '../../../utils/utils';

@Injectable()
export class TravelRepository implements TravelRepositoryInterface {
  constructor(
    @InjectRepository(Travel)
    private readonly repository: Repository<Travel>,
  ) {}

  async listTravels(
    rows: number,
    page: number,
    userId: number,
  ): Promise<PaginationResultDTO> {
    const items: Travel[] = await this.repository
      .createQueryBuilder()
      .where('user_id = :userId', { userId })
      .take(rows)
      .skip((page - 1) * rows || 0)
      .select('*')
      // Also can be resolved with foreach and split
      .orderBy(
        `CONCAT(split_part(goal, '/', 2), split_part(goal, '/', 1))`,
        'ASC',
      )
      .cache(`list-travels-${page}-${rows}`)
      .getRawMany();

    const total = await this.repository
      .createQueryBuilder()
      .where('user_id = :userId', { userId })
      .getCount();

    return {
      data: items,
      total,
      page,
      rows: items.length,
    };
  }

  async findTravel(id: number, userId: number): Promise<Travel> {
    return await this.repository
      .createQueryBuilder()
      .where('id = :id', { id })
      .andWhere('user_id = :userId', { userId })
      .select('*')
      .getRawOne();
  }

  async findDuplicateTravel(
    country: string,
    locale: string,
    userId: number,
  ): Promise<Travel> {
    return await this.repository
      .createQueryBuilder()
      .select('*')
      .where('locale = :locale', { locale })
      .andWhere('country = :country', { country })
      .andWhere('user_id = :userId', { userId })
      .getRawOne();
  }

  async updateTravel(id: number, travel: UpdateTravelDTO): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(Travel)
      .set({
        ...travel,
      })
      .where('id = :id', { id })
      .andWhere('user_id = :userId', { userId: travel.userId })
      .execute();
  }

  async createTravel(travel: CreateTravelDTO): Promise<number> {
    const result = await this.repository
      .createQueryBuilder()
      .insert()
      .into(Travel)
      .values({
        ...travel,
      })
      .execute();

    return result.identifiers[0].id;
  }

  async deleteTravel(id: number, userId: number): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .andWhere('user_id = :userId', { userId })
      .execute();
  }
}
