import { Expose } from 'class-transformer';

export class CategoriaResponseDto {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  descripcion?: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;
}
