import { Module } from '@nestjs/common';
import { LugaresController } from './controller/lugares.controller';
import { LugaresService } from './service/lugares.service';

@Module({
    controllers: [LugaresController],
    providers: [LugaresService]
})
export class LugaresModule {}