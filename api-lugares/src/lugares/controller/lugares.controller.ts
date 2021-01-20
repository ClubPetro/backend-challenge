import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateLugaresDto } from '../models/DTO/create-lugares.dto';
import { UpdateLugaresDto } from '../models/DTO/update-lugares.dto';
import { Lugares } from '../models/lugares.entity';
import { LugaresService } from '../service/lugares.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
@ApiTags('lugares')
@Controller('lugares')
export class LugaresController{

    constructor(private lugaresService: LugaresService){}

    @Post()
    @ApiOperation({summary: 'Cria um Lugar'})
    @ApiResponse({status: 400, description: 'Data inserida no passado ou formato inválido de dados, não autorizado'})
    @ApiResponse({status: 409, description: 'Registro já inserido no Banco de Dados'})
    @ApiResponse({status: 201, description: 'Registro cadastrado com sucesso'})
    @ApiBody({type: CreateLugaresDto})
    async create(@Body() createLugares: CreateLugaresDto): Promise<Lugares>{
        return this.lugaresService.create(createLugares);
    }

    @Get()
    @ApiOperation({summary: 'Retorna todos os Lugares'})
    @ApiResponse({status: 200, description: 'Todos os lugares retornados com sucesso'})
    async getAll(): Promise<Lugares[]>{
        return this.lugaresService.getAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Retorna um Lugar pelo seu id'})
    @ApiResponse({status: 404, description: 'Lugar especificado não existe'})
    @ApiResponse({status: 200, description: 'Lugar retornado com sucesso'})
    async getById(@Param('id') id: string): Promise<Lugares>{
        return this.lugaresService.getById(id);
    }

    @Put(':id')
    @ApiOperation({summary: 'Atualiza um Lugar pelo seu id'})
    @ApiResponse({status: 404, description: 'Lugar especificado não existe'})
    @ApiResponse({status: 200, description: 'Lugar atualizado com sucesso'})
    @ApiResponse({status: 400, description: 'Dado inserido incorretamente'})
    @ApiBody({type: UpdateLugaresDto})
    async update(@Param('id') id: string, @Body() updateLugares: UpdateLugaresDto): Promise<Lugares>{
        return this.lugaresService.update(id, updateLugares);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Deleta um Lugar pelo seu id'})
    @ApiResponse({status: 404, description: 'Lugar especificado não existe'})
    @ApiResponse({status: 204, description: 'Lugar removido com sucesso (porém, sem retorno)'})
    @HttpCode(204)
    async delete(@Param('id') id: string){
        return this.lugaresService.delete(id);
    }
}