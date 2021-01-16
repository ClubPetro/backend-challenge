import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LugaresController } from './controller/lugares.controller';
import { Lugares } from './models/lugares.entity';
import { LugaresService } from './service/lugares.service';

@Module({
    imports: [TypeOrmModule.forFeature([Lugares])],
    controllers: [LugaresController],
    providers: [LugaresService]
})
export class LugaresModule {}