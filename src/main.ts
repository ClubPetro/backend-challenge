import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

import { AppModule } from './app.module';

import { name, description, version } from '@package';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || configService.get('API_PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: `Swagger ${name}`,
  });
  await app.listen(port, () => {
    Logger.log(`Listening at ${port}`);
  });
}
bootstrap();
