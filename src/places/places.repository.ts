
import { BadRequestException, NotFoundException, Param, Logger, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePlacesDto } from './dto/create-places.dto';
import { UpdatePlacesDto } from './dto/update-places.dto';
import { Places } from './places.entity';
import { format } from 'date-fns';
import { DateUtils } from '../utils/date-utils';
import axios from 'axios';

@EntityRepository(Places)
export class PlacesRepository extends Repository<Places> {

  private logger = new Logger('Places');

  async createPlace(createPlacesDto: CreatePlacesDto): Promise<Places> {

    const { country, place, goal } = createPlacesDto;

    const places = new Places();
    const checkDate = new DateUtils(goal);
    checkDate.validateDate();

    var countryFlag;
    /* consulta api de paises, caso exista retorna a bandeira*/
    try {
      const response = await axios.get(`https://restcountries.com/v3/translation/${country}`);
      if (response.data.status === 404)
        throw new BadRequestException("Country not found.");
      countryFlag = response.data[0].flags;

    } catch (error) {
      this.logger.error('Country not found', error.stack);
      throw new BadRequestException("Country not found.");
    }

    /*Consulta para verificar a existencia de um local repetido para o mesmo pais*/
    const query = this.createQueryBuilder('Places');
    query.andWhere('Places.country = :country', { country });
    query.andWhere('Places.place = :place', { place });

    const lugarJaExiste = await query.getOne();

    /* Caso exista o mesmo local para o pais, retorna erro */
    if (lugarJaExiste)
      throw new ConflictException(`Place : "${place}" already exist for country: "${country}" `);

    /*checa se o formato da data passo é valido*/
    if (!checkDate.isValidFormat)
      throw new BadRequestException("Format Inválid for date");

    /*checa se a data passada é anterior a atual*/
    if (!checkDate.dateIsBefore)
      throw new BadRequestException(`Failed insert, because goal :"${format(checkDate.dateEntity, 'dd/MM/yyyy')}" is before  : "${format(new Date(), 'dd/MM/yyyy')}"`);

    places.country = country;
    places.place = place;
    places.urlflag = countryFlag[0];
    places.goal = checkDate.dateEntity;

    try {
      await places.save();
    } catch (error) {
      this.logger.error(`Failed to create place", Data: ${JSON.stringify(createPlacesDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
    return places;
  }

  async getPlaces(): Promise<Places[]> {

    if (!(await this.find()))
      throw new NotFoundException;
    try {
      return this.find({
        order: {
          goal: "ASC",
        }
      });
    } catch (error) {
      this.logger.error('Failed to get Places internalServerError', error.stack);
      throw new InternalServerErrorException();
    }
  }
  async getPlaceById(id: number): Promise<Places> {
    const place = await this.findOne(id);
    if (!place)
      throw new NotFoundException(`Place with ID:${id} not find`);
    return place;
  }

  async updatePlace(id: number, updatePlacesDto: UpdatePlacesDto): Promise<Places> {

    const { place, goal } = updatePlacesDto;

    const UpPlace = await this.findOne(id);


    if (!UpPlace)
      throw new NotFoundException(`Place with ID: "${id}" not found.`);

    const query = this.createQueryBuilder('Places');

    query.andWhere('Places.country = :country', { country: UpPlace.country });
    query.andWhere('Places.id != :id', { id: UpPlace.id });
    query.andWhere('Places.place = :place', { place });

    const placeAlreadyexists = await query.getOne();

    if (placeAlreadyexists)
      throw new ConflictException(`Place : "${place}" already exist for country: "${UpPlace.country}" `);



    if (!place && !goal) {
      throw new NotFoundException(`Not found any parameter`);
    }

    if (place) {
      if (place.trim().length > 0)
        UpPlace.place = place.trim();
        UpPlace.updated_at = new Date();
    }
    if (goal) {
      if (goal.trim().length > 0) {

        const checkDate = new DateUtils(goal);
        checkDate.validateDate();
        UpPlace.goal = checkDate.dateEntity;

        if (!checkDate.isValidFormat)
          throw new BadRequestException("Date format invalid for goal.");

        if (!checkDate.dateIsBefore)
          throw new BadRequestException(`goal :"${format(checkDate.dateEntity, 'MM/yyyy')}" anterior a data atual "${format(new Date(), 'MM/yyyy')}" `);
          UpPlace.updated_at = new Date();
        }
    }


    try {
      return await UpPlace.save();
    } catch (error) {
      this.logger.error(`Failed to update place", Data: ${JSON.stringify(updatePlacesDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async deletePlace(
    id: number
  ): Promise<void> {

    const result = await this.findOne(id);
    if (!result)
      throw new NotFoundException(`Place with Id ${id} not found`);

    await this.delete(id);

  }
}