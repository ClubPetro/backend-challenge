import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PagginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp().getRequest();

    if (http.route.methods.get && (!http.query?.page || !http.query?.rows)) {
      http.query.page = http.query?.page || 1;
      http.query.rows = http.query?.rows || 100;
    }

    return next.handle().pipe();
  }
}
