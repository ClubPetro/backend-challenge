import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.log(`Generating document data...`);
  const config = new DocumentBuilder()
    .setTitle('Places API')
    .setDescription('Places CRUD Api')
    .setVersion('1.0')
    .addTag('places')
    .build();

  Logger.log(`Document data generated. Generating document...`);
  //Generating document from info.
  const document = SwaggerModule.createDocument(app, config);

  Logger.log(`Document generated. Setting up into /api...`);
  //Set-up the document into {host}/api
  SwaggerModule.setup('/api', app, document);

  Logger.log(`Document set-up. Starting server...`);
  await app.listen(PORT);
  Logger.log(`Server listening on port ${PORT}`);
}
bootstrap();
