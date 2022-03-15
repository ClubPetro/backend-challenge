import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getDBConfig = async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
        type: config.get<string>("TYPEORM_CONNECTION") as any,
        host: config.get<string>('TYPEORM_HOST'),
        port: +config.get<number>('TYPEORM_PORT'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        autoLoadEntities: true,
        synchronize: config.get<string>('TYPEORM_SYNCHRONIZE') === "true",
        logging: config.get<string>('TYPEORM_LOGGING') === "true"
    }
}