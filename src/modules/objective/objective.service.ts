import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';
import { ObjectiveEntity } from './entities/objective.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectiveGetAllOptions } from '../../commons/types/objective.type';
import { validateTotalPage } from '../../commons/utils/validate-total-page.utils';
import { CountryService } from '../country/country.service';

@Injectable()
export class ObjectiveService {
  constructor(
    @InjectRepository(ObjectiveEntity)
    private readonly objectiveRepository: Repository<ObjectiveEntity>,
    private readonly countryService: CountryService,
  ) {}

  async create(createObjectiveDto: CreateObjectiveDto) {
    const { countryId, goalPlace } = createObjectiveDto;

    const country = await this.countryService.findOneById(countryId);

    if (!country) {
      throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
    }

    const hasGoalPlace = await this.objectiveRepository.findOne({
      where: {
        goalPlace: goalPlace.toLowerCase(),
        countryId,
      },
    });

    if (hasGoalPlace) {
      throw new HttpException(
        'Goal for this Country already exists',
        HttpStatus.CONFLICT,
      );
    }
    const objectiveCreated =
      this.objectiveRepository.create(createObjectiveDto);
    return this.objectiveRepository.save(objectiveCreated);
  }

  async findAll({ page }: ObjectiveGetAllOptions) {
    page = page ? page : '1';
    const pageSize = +(process.env.PAGINATION_SIZE || 10);

    const [data, total] = await this.objectiveRepository.findAndCount({
      select: {
        id: true,
        goalPlace: true,
        goalDate: true,
        createdAt: true,
        country: {
          id: true,
          name: true,
          flagUrl: true,
          createdAt: true,
        },
      },
      relations: ['country'],
      order: {
        goalPlace: 'ASC',
      },
      skip: (+page - 1) * pageSize,
      take: pageSize,
    });

    return {
      data,
      numberTotalPage: validateTotalPage(total, pageSize),
    };
  }

  async update(id: string, { goalDate, goalPlace }: UpdateObjectiveDto) {
    const objective = await this.objectiveRepository.findOneBy({ id });

    if (!objective) {
      throw new HttpException('Objective not found', HttpStatus.NOT_FOUND);
    }

    if (goalPlace) {
      const hasGoalPlace = await this.objectiveRepository.findOne({
        where: {
          goalPlace: goalPlace.toLowerCase(),
          countryId: objective.countryId,
        },
      });

      if (hasGoalPlace) {
        throw new HttpException(
          'Goal for this Country already exists',
          HttpStatus.CONFLICT,
        );
      }
    }

    const objectiveCreated = this.objectiveRepository.create({
      ...objective,
      goalDate,
      goalPlace,
    });

    const { affected } = await this.objectiveRepository.update(
      id,
      objectiveCreated,
    );

    if (!affected) {
      throw new HttpException('Not Modified', HttpStatus.NOT_MODIFIED);
    }

    return objectiveCreated;
  }

  async remove(id: string) {
    const objective = await this.objectiveRepository.findOneBy({ id });

    if (!objective) {
      throw new HttpException('Objective not found', HttpStatus.NOT_FOUND);
    }

    const { affected } = await this.objectiveRepository.delete(id);

    if (!affected) {
      throw new HttpException('Not Modified', HttpStatus.NOT_MODIFIED);
    }

    return objective;
  }
}
