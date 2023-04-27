import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JWTInfoInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp().getRequest();

    if (http?.user?.id) {
      http.query.userId = http.user.id;
      http.body.userId = http.user.id;
    }

    return next.handle().pipe();
  }
}
