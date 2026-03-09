import { Expose } from 'class-transformer';

export class EmpleadoResponseDto {
  @Expose() id: number;
  @Expose() nombre: string;
  @Expose() apellido_p: string;
  @Expose() apellido_m: string;
  @Expose() email: string;
  @Expose() telefono: string;
  @Expose() fecha_nacimiento: string;
  @Expose() rol: string;
  @Expose() activo: boolean;
}