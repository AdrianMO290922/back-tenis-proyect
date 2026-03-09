import { Injectable } from '@nestjs/common';

interface Bucket {
  tokens: number;
  lastRefill: number;
}

@Injectable()
export class TokenBucketService {
  private readonly buckets = new Map<string, Bucket>();
  
  // Configuración del cubo
  private readonly capacity = 10; // Máximo de tokens
  private readonly refillRate = 1; // Tokens por segundo (1 cada 1s)

  consume(key: string): boolean {
    const now = Date.now();
    let bucket = this.buckets.get(key);

    // Si es un usuario nuevo, le damos el cubo lleno
    if (!bucket) {
      bucket = { tokens: this.capacity, lastRefill: now };
    } else {
      // Cálculo de refinamiento (Tokens ganados por el tiempo pasado)
      const elapsedSeconds = (now - bucket.lastRefill) / 1000;
      const tokensToAdd = Math.floor(elapsedSeconds * this.refillRate);
      
      bucket.tokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
      bucket.lastRefill = now;
    }

    // Intento de consumo
    if (bucket.tokens > 0) {
      bucket.tokens -= 1;
      this.buckets.set(key, bucket);
      return true; // Petición permitida
    }

    return false; // Límite excedido
  }
}