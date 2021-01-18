import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLugaresDto } from '../models/DTO/create-lugares.dto';
import { UpdateLugaresDto } from '../models/DTO/update-lugares.dto';
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

    async getById(id: string): Promise<Lugares>{
        return await this.lugaresRepository.findOneOrFail(id);
    }

    async create(createLugares: CreateLugaresDto): Promise<Lugares>{
        const dataAtual = new Date();

        //Verificando se o usuário coloca uma data de meta no passado
        if(createLugares.ano == dataAtual.getFullYear()){
            if(createLugares.mes < dataAtual.getMonth() + 1){
                throw new BadRequestException("A data requerida está no passado, por favor informe uma data correta!");
            }
        }

        const lugarAtualizado = this.lugaresRepository.create({
            nomePais: createLugares.nomePais,
            local: createLugares.local,
            mes: createLugares.mes,
            ano: createLugares.ano,
            created_at: dataAtual,
            updated_at: dataAtual,
            stringPhoto: createLugares.stringPhoto,
        });
        
        //Só é possível porque a entidade de lugar herda a entidade básica do TypeORM
        return await lugarAtualizado.save();
    }

    async update(id: string, updateLugares: UpdateLugaresDto): Promise<Lugares>{
        const dataAtual = new Date();

        await this.lugaresRepository.update(id, {
            local: updateLugares.local,
            mes: updateLugares.mes,
            ano: updateLugares.ano,
            updated_at: dataAtual,
        });

        return this.getById(id);
    }
}