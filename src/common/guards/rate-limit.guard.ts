import { 
  CanActivate, 
  ExecutionContext, 
  Injectable, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { TokenBucketService } from '../services/token-bucket.service';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(private readonly tokenBucketService: TokenBucketService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Usamos la IP del cliente como llave única
    const ip = request.ip || request.headers['x-forwarded-for'] || 'unknown';

    const canProceed = this.tokenBucketService.consume(ip);

    if (!canProceed) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: `El cliente ${ip} ha excedido el límite de peticiones`,
          error: 'TOO_MANY_REQUESTS',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}