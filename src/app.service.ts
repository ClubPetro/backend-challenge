import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): object {
        return { version: '1.0.0' };
    }
}
