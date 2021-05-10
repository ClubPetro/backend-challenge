import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
        return await this.lugaresRepository.query("SELECT * FROM public.lugares ORDER BY ano ASC, mes ASC");
    }

    async getById(id: string): Promise<Lugares>{
        if(!await this.lugaresRepository.findOne(id))
            throw new NotFoundException("Cadastro com esse ID não existe");
        return await this.lugaresRepository.findOne(id);
    }

    async create(createLugares: CreateLugaresDto): Promise<Lugares>{
        const dataAtual = new Date();

        //Verificando se o usuário coloca uma data de meta no passado
        if(createLugares.ano == dataAtual.getFullYear()){
            if(createLugares.mes < dataAtual.getMonth() + 1){
                throw new BadRequestException("A data requerida está no passado, por favor informe uma data correta!");
            }
        }

        //Verificando se existe já um registro da cidade com o país no BD. UNIQUE seria o ideal em outras situações usar mas pode haver 
        //cidades com nomes iguais em países diferentes :(
        const lugarBD = await this.lugaresRepository.findOne({where: {nomePais: createLugares.nomePais, local:createLugares.local}});
        if(lugarBD)
            throw new ConflictException("Lugar já cadastrado no Banco de Dados");

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
        if(!await this.lugaresRepository.findOne(id))
            throw new NotFoundException("Cadastro com esse ID não existe");

        const dataAtual = new Date();

        await this.lugaresRepository.update(id, {
            local: updateLugares.local,
            mes: updateLugares.mes,
            ano: updateLugares.ano,
            updated_at: dataAtual,
        });

        return this.getById(id);
    }

    async delete(id: string): Promise<void>{
        if(await this.lugaresRepository.findOne(id))
            await this.lugaresRepository.delete(id);
        else
            throw new NotFoundException("Cadastro com esse ID não existe");
    }
}