import { Travel } from '../entities/travel.entity';
import { UpdateTravelDTO } from '../dto/update-travel.dto';
import { CreateTravelDTO } from '../dto/create-travel.dto';
import { PaginationResultDTO } from '../../../utils/dto/pagination-result.dto';

export interface TravelRepositoryInterface {
  listTravels(
    page: number,
    rows: number,
    userId: number,
  ): Promise<PaginationResultDTO>;
  findTravel(id: number, userId: number): Promise<Travel>;
  findDuplicateTravel(
    locale: string,
    goal: string,
    userId: number,
  ): Promise<Travel>;
  updateTravel(id: number, travel: UpdateTravelDTO): Promise<void>;
  createTravel(travel: CreateTravelDTO): Promise<number>;
  deleteTravel(id: number, userId: number): Promise<void>;
}
