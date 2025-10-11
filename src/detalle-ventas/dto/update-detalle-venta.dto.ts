import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleVentaDto } from './create-detalle-venta.dto';

export class UpdateDetalleVentaDto extends PartialType(CreateDetalleVentaDto) {}
