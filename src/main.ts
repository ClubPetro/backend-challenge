import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as helmet from 'helmet';

import { envConfig } from './config/env.load';
import * as uploadConfig from './config/upload.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(envConfig.api.prefix);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    `${envConfig.api.prefix}/files`,
    express.static(uploadConfig.default.directory),
  );
  console.log(envConfig);
  app.use(helmet());
  await app.listen(`${envConfig.api.port}`);
}
bootstrap();
