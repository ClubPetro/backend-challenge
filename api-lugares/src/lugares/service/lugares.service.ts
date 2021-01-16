import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLugaresDto } from '../models/DTO/create-lugares.dto';
import { Lugares } from '../models/lugares.entity'

@Injectable()
export class LugaresService{
    constructor(
        @InjectRepository(Lugares)
        private lugaresRepository: Repository<Lugares>
    ){}

    async getAll(): Promise<Lugares[]>{
        return await this.lugaresRepository.find();
    }

    async create(createLugares: CreateLugaresDto): Promise<Lugares>{
        return await this.lugaresRepository.save(createLugares);
    }
}