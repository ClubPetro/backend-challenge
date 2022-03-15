import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getNetworkConfig, networkConfig } from './config/index.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cfgService: ConfigService = app.get(ConfigService);
  const networkConfig: networkConfig = getNetworkConfig(cfgService);

  app.useGlobalPipes(new ValidationPipe(networkConfig.validationPipeOptions));

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
  await app.listen(networkConfig.port);
  Logger.log(`Server listening on port ${networkConfig.port}`);
}
bootstrap();
