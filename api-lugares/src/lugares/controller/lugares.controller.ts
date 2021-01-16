import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLugaresDto } from '../models/DTO/create-lugares.dto';
import { Lugares } from '../models/lugares.entity';
import { LugaresService } from '../service/lugares.service';
@Controller('lugares')
export class LugaresController{

    constructor(private lugaresService: LugaresService){}

    @Post()
    async create(@Body() createLugares: CreateLugaresDto){
        return this.lugaresService.create(createLugares);
    }

    @Get()
    async getAll(): Promise<Lugares[]>{
        return this.lugaresService.getAll();
    }
}