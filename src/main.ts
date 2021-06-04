import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Places api exemplo')
    .setDescription('Describe API of Places')
    .setVersion('1.0')
    .addTag('Places')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('backend-challenge', app, document);


  await app.listen(3000);
  logger.log(`Application listening on port ${3000}`);
}
bootstrap();
