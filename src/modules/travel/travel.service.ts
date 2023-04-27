import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PaginationResultDTO } from '../../utils/dto/pagination-result.dto';
import { SuccessResponseDTO } from '../../utils/dto/success-response.dto';
import { CreateTravelDTO } from './dto/create-travel.dto';
import { UpdateTravelDTO } from './dto/update-travel.dto';
import { Travel } from './entities/travel.entity';
import { TravelRepository } from './repositories/travel.repository';
import { ListTravelsDTO } from './dto/list-travels.dto';

@Injectable()
export class TravelService {
  constructor(private travelRepository: TravelRepository) {}

  async list(query: ListTravelsDTO): Promise<PaginationResultDTO> {
    return await this.travelRepository.listTravels(
      query.rows,
      query.page,
      query.userId,
    );
  }

  async find(id: number, userId: number): Promise<Travel> {
    if (!id || !userId) {
      throw new BadRequestException('id & userId fields could not be empty');
    }
    const travel = await this.travelRepository.findTravel(id, userId);
    if (!travel) {
      throw new NotFoundException('Travel not found');
    }
    return travel;
  }

  async create(body: CreateTravelDTO): Promise<Partial<Travel>> {
    const travel = await this.travelRepository.findDuplicateTravel(
      body.country,
      body.locale,
      body.userId,
    );

    const regex = new RegExp(`^(0[1-9]|1[0-2])\/?([0-9]{4})$`);
    if (!regex.test(body.goal)) {
      throw new BadRequestException('Goal format is incorrect, use MM/YYYY');
    }

    if (travel) {
      throw new BadRequestException(
        'This country/locale combination already exists',
      );
    }

    body.createdAt = new Date();
    body.updatedAt = new Date();
    const id = await this.travelRepository.createTravel({
      ...body,
    });
    return {
      ...body,
      id,
    };
  }

  async update(id: number, body: UpdateTravelDTO): Promise<Travel> {
    const travel = await this.travelRepository.findTravel(id, body.userId);
    if (!travel) {
      throw new NotFoundException('Travel not found');
    }
    body.updatedAt = new Date();
    await this.travelRepository.updateTravel(id, body);
    return {
      ...travel,
      ...body,
    };
  }

  async delete(id: number, userId: number): Promise<SuccessResponseDTO> {
    const travel = await this.travelRepository.findTravel(id, userId);
    if (!travel) {
      throw new NotFoundException('Travel not found');
    }
    await this.travelRepository.deleteTravel(id, userId);
    return new SuccessResponseDTO();
  }
}
