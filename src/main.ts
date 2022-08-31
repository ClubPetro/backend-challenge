import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 3000;

    app.setGlobalPrefix('api/v1');

    setupSwagger(app);

    await app.listen(port);
}
bootstrap();
