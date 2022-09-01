import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/errors/filters/global-exception.filter';
import { setupSwagger } from './config/swagger';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const port = process.env.PORT || 3000;

    app.setGlobalPrefix('api/v1');

    app.use(helmet(), helmet.hidePoweredBy());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.useGlobalFilters(new GlobalExceptionFilter());

    setupSwagger(app);

    await app.listen(port);
}
bootstrap();
