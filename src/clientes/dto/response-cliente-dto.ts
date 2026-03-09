import { Expose } from 'class-transformer';

export class ClientResponseDto {
  @Expose() id: number;
  @Expose() nombres: string;
  @Expose() apellido_p: string;
  @Expose() apellido_m: string;
  @Expose() email: string;
  @Expose() telefono: string;
  @Expose() fecha_nacimiento: string;
}