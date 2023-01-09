/* eslint-disable @typescript-eslint/no-var-requires */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
const packageFile = require('../package.json');
import './envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(`backend-challenge - ${process.env.NODE_ENV}`)
    .setDescription('backend do projeto backendchallenge (Yuri Mancini)')
    .setVersion(packageFile.version)
    .addTag('backend-challenge')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
