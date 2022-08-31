import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('Places API ')
        .setDescription('A Place API to management locals to visit')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        ignoreGlobalPrefix: false,
    });
    SwaggerModule.setup('docs/api', app, document);
}
