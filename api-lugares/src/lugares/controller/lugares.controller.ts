import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateLugaresDto } from '../models/DTO/create-lugares.dto';
import { UpdateLugaresDto } from '../models/DTO/update-lugares.dto';
import { Lugares } from '../models/lugares.entity';
import { LugaresService } from '../service/lugares.service';
@Controller('lugares')
export class LugaresController{

    constructor(private lugaresService: LugaresService){}

    @Post()
    async create(@Body() createLugares: CreateLugaresDto): Promise<Lugares>{
        return this.lugaresService.create(createLugares);
    }

    @Get()
    async getAll(): Promise<Lugares[]>{
        return this.lugaresService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Lugares>{
        return this.lugaresService.getById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateLugares: UpdateLugaresDto): Promise<Lugares>{
        return this.lugaresService.update(id, updateLugares);
    }
}