import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsDateString,
  IsNotEmpty,
  Min,
  Max,
  IsPositive,
  IsInt,
  Length,
  IsUUID,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { CreateDetalleVentaDto } from 'src/detalle-ventas/dto/create-detalle-venta.dto';

export enum TipoVentaEnum {
  Presencial = 'Presencial',
  Online = 'Online',
}

export enum TipoPagoEnum {
  Efectivo = 'Efectivo',
  Tarjeta = 'Tarjeta',
  Transferencia = 'Transferencia',
}

export class DetalleVentaInput {
  @IsNotEmpty({ message: 'El ID del inventario es requerido' })
  @IsInt({ message: 'El ID del inventario debe ser un número entero' })
  @IsPositive({ message: 'El ID del inventario debe ser positivo' })
  @Type(() => Number)
  inventario_id: number;

  @IsNotEmpty({ message: 'La cantidad es requerida' })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @IsPositive({ message: 'La cantidad debe ser positiva' })
  @Min(1, { message: 'La cantidad mínima es 1' })
  @Type(() => Number)
  cantidad: number;

  @IsNotEmpty({ message: 'El total es requerido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El total debe tener máximo 2 decimales' },
  )
  @IsPositive({ message: 'El total debe ser positivo' })
  @Transform(({ value }) => parseFloat(value))
  total: number;
}


export class CreateVentaDto {
  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'La fecha debe tener un formato válido (YYYY-MM-DDTHH:mm:ss.sssZ)',
    },
  )
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  fecha?: Date;

  @IsNotEmpty({ message: 'El tipo de venta es requerido' })
  @IsEnum(TipoVentaEnum, {
    message: 'El tipo de venta debe ser Presencial u Online',
  })
  tipo_venta: TipoVentaEnum;

  @IsNotEmpty({ message: 'El tipo de pago es requerido' })
  @IsEnum(TipoPagoEnum, {
    message: 'El tipo de pago debe ser Efectivo, Tarjeta o Transferencia',
  })
  tipo_pago: TipoPagoEnum;

  @IsOptional()
  @IsInt({ message: 'El ID del cliente debe ser un número entero' })
  @IsPositive({ message: 'El ID del cliente debe ser un número positivo' })
  @Type(() => Number)
  cliente_id?: number;

  @IsNotEmpty({ message: 'El ID del empleado es requerido' })
  @IsInt({ message: 'El ID del empleado debe ser un número entero' })
  @IsPositive({ message: 'El ID del empleado debe ser un número positivo' })
  @Type(() => Number)
  empleado_id: number;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El subtotal debe tener máximo 2 decimales' },
  )
  @IsPositive({ message: 'El subtotal debe ser un número positivo' })
  @Min(0, { message: 'El subtotal no puede ser negativo' })
  @Max(99999999.99, { message: 'El subtotal no puede exceder 99,999,999.99' })
  @Transform(({ value }) => parseFloat(value))
  subtotal?: number;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El subtotal debe tener máximo 2 decimales' },
  )
  @Min(0, { message: 'El descuento no puede ser negativo' })
  @Max(99999999.99, { message: 'El descuento no puede exceder 99,999,999.99' })
  @Transform(({ value }) => parseFloat(value))
  descuento?: number;

  @IsNotEmpty({ message: 'El total es requerido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El subtotal debe tener máximo 2 decimales' },
  )
  @IsPositive({ message: 'El total debe ser un número positivo' })
  @Min(0.01, { message: 'El total debe ser mayor a 0' })
  @Max(99999999.99, { message: 'El total no puede exceder 99,999,999.99' })
  @Transform(({ value }) => parseFloat(value))
  total: number;

  @IsNotEmpty({ message: 'Los detalles de la venta son requeridos' })
  @IsArray({ message: 'Los detalles deben ser un array' })
  @ArrayMinSize(1, { message: 'Debe haber al menos un producto' })
  @ValidateNested({ each: true })
  @Type(() => DetalleVentaInput)
  detalles: DetalleVentaInput[];
}
