import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as redisStore from 'cache-manager-redis-store';

import { GlobalExceptionFilter } from '@core/exception/exception.filter';

import { PlaceModule } from './modules/places/infra/nest/place.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      cache: true,
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store:
          configService.get('CACHE_ENABLED') === 'true' ? redisStore : 'memory',
        host: configService.get('CACHE_HOST'),
        port: configService.get<number>('CACHE_PORT'),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        namingStrategy: new SnakeNamingStrategy(),
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        // dropSchema: true,
        logging: configService.get('NODE_ENV') !== 'production',
        supportBigNumbers: true,
        bigNumberStrings: false,
      }),
    }),
    PlaceModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
