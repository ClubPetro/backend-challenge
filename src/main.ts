import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle('ClubPetro API')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, swaggerDocument);
  await app.listen(3000);
}
bootstrap();
