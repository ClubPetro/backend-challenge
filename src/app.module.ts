import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesModule } from './places/places.module';
import configuration from './config/general';
import TypeOrmConfig from './config/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmConfig(),
        PlacesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
