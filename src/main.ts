import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { PaginationInterceptor } from './interceptor/pagination.interceptor';
import { JWTInfoInterceptor } from './interceptor/jwt-info.interceptor';
import { NomenclatureInterceptor } from './interceptor/nomenclature.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  const config = new DocumentBuilder()
    .setTitle('API Travel - ClubPetro')
    .setDescription('Travel CRUD')
    .setVersion('1.0')
    .addTag('ClubPetro')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new PaginationInterceptor());
  app.useGlobalInterceptors(new JWTInfoInterceptor());
  app.useGlobalInterceptors(new NomenclatureInterceptor());
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
