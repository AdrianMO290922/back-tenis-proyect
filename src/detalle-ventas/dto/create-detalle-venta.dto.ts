import {
  IsNumber,
  IsDecimal,
  IsNotEmpty,
  IsInt,
  IsPositive,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateDetalleVentaDto {
  @IsNotEmpty({ message: 'El ID de la venta es requerido' })
  @IsInt({ message: 'El ID de la venta debe ser un número entero' })
  @IsPositive({ message: 'El ID de la venta debe ser positivo' })
  @Type(() => Number)
  venta_id: number;

  @IsNotEmpty({ message: 'El ID del inventario es requerido' })
  @IsInt({ message: 'El ID del inventario debe ser un número entero' })
  @IsPositive({ message: 'El ID del inventario debe ser un número positivo' })
  @Type(() => Number)
  inventario_id: number;

  @IsNotEmpty({ message: 'La cantidad es requerida' })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @IsPositive({ message: 'La cantidad debe ser un número positivo' })
  @Min(1, { message: 'La cantidad mínima es 1' })
  @Max(9999, { message: 'La cantidad máxima es 9999' })
  @Type(() => Number)
  cantidad: number;

  @IsNotEmpty({ message: 'El total es requerido' })
  @IsDecimal(
    { decimal_digits: '0,2' },
    { message: 'El total debe tener máximo 2 decimales' },
  )
  @IsPositive({ message: 'El total debe ser un número positivo' })
  @Min(0.01, { message: 'El total debe ser mayor a 0' })
  @Max(99999999.99, { message: 'El total no puede exceder 99,999,999.99' })
  @Transform(({ value }) => parseFloat(value))
  total: number;
}
