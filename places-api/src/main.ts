import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Generating docs.
  const config = new DocumentBuilder()
    .setTitle('Places API')
    .setDescription('Places CRUD Api')
    .setVersion('1.0')
    .addTag('places')
    .build();
  //Generating document from info.
  const document = SwaggerModule.createDocument(app, config);
  //Set-up the document into {host}/api
  SwaggerModule.setup('/api', app, document);

  await app.listen(PORT);
}
bootstrap();
