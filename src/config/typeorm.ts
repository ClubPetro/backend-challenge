import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './general';

const { host, port, username, password, name } = configuration().database;

export default () =>
    TypeOrmModule.forRoot({
        type: 'postgres',
        host,
        port,
        username,
        password,
        database: name,
        autoLoadEntities: true,
        synchronize: true,
    });
