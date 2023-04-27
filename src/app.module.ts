import { UserModule } from './modules/user/user.module';
import { TravelModule } from './modules/travel/travel.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { HealthcheckController } from './modules/healthcheck/healthcheck.controller';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import * as path from 'path';
import * as fs from 'fs';
import { AuthModule } from './modules/authentication/auth.module';
import { NomenclatureMiddleware } from './middlewares/nomenclature.middleware';
import 'dotenv/config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TravelModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || 'admin',
      database: process.env.DB_NAME || 'petroclub',
      synchronize: true,
      autoLoadEntities: true,
      entities: [__dirname + '/modules/**/entities/*.entity{.ts,.js}'],
      logging: false,
      cache: {
        duration: 1000 * 10,
        type: 'redis',
        options: {
          url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
          legacyMode: true,
        },
        tableName: 'clubpetro-api',
        ignoreErrors: true,
      },
    }),
  ],
  controllers: [HealthcheckController],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure('combined', {
      stream: fs.createWriteStream(
        path.join(__dirname, '../logs/request.log'),
        {
          flags: 'a',
        },
      ),
    });
    consumer.apply(MorganMiddleware).forRoutes('*');
    consumer.apply(NomenclatureMiddleware).forRoutes('*');
  }
}
