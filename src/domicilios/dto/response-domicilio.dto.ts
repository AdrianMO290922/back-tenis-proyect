import { Expose } from 'class-transformer';

export class DomicilioResponseDto {
  // vi que tu expones el ID Adrian
  // y yo lo deje asi, pero si quieres lo agrego
  // @Expose() id: number;
  @Expose() calle: string;
  @Expose() colonia: string;
  @Expose() numero: string;
  @Expose() cp: string;
  @Expose() ciudad: string;
  @Expose() estado: string;
  @Expose() referencia?: string;
}
