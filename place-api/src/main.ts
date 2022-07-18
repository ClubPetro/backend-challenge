import { NestFactory } from '@nestjs/core'
import { AppModule } from './AppModule'
import { Logger, ValidationPipe } from '@nestjs/common'
import * as bodyParser from 'body-parser'
import ValidationExceptionFactory from './exception/ValidationExceptionFactory'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
    const logger = new Logger()
    const app = await NestFactory.create(AppModule)
    app.enableCors()

    const config = new DocumentBuilder()
        .setTitle('Places Api')
        .setDescription('Place Api Documentation')
        .setVersion('1.0')
        .addTag('places')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen('3000')
    app.use(bodyParser.json({ limit: '10mb' }))
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            exceptionFactory: ValidationExceptionFactory,
        }),
    )
    logger.debug('Listening on http://localhost:3000}/')
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
