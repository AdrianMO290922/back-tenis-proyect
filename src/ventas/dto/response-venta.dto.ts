import { Expose, Type } from 'class-transformer';

class CategoriaResponseDto {
  @Expose() id: number;
  @Expose() nombre: string;
}

class MarcaResponseDto {
  @Expose() id: number;
  @Expose() nombre: string;
}

class ProductoResponseDto {
  @Expose() id: number;
  @Expose() nombre: string;
  @Expose() color: string;
  @Expose() activo: boolean;

  @Expose()
  @Type(() => CategoriaResponseDto)
  categorias: CategoriaResponseDto;

  @Expose()
  @Type(() => MarcaResponseDto)
  marcas: MarcaResponseDto;
}

class InventarioResponseDto {
  @Expose() id: number;
  @Expose() talla: string;
  @Expose() cantidad: number;
  @Expose() precio_venta: number;

  @Expose()
  @Type(() => ProductoResponseDto)
  productos: ProductoResponseDto;
}

class DetalleVentaResumenDto {
  @Expose() id: number;
  @Expose() inventario_id: number;
  @Expose() cantidad: number;
  @Expose() total: number;

  @Expose()
  @Type(() => InventarioResponseDto)
  inventarios: InventarioResponseDto;
}

class ClienteResumenDto {
  @Expose() id: number;
  @Expose() nombres: string;
  @Expose() apellido_p: string;
  @Expose() apellido_m: string;
  @Expose() email: string;
  @Expose() telefono: string;
}

class EmpleadoResumenDto {
  @Expose() id: number;
  @Expose() nombre: string;
  @Expose() apellido_p: string;
  @Expose() email: string;
  @Expose() rol: string;
}

export class VentaResponseDto {
  @Expose() id: number;
  @Expose() fecha: Date;
  @Expose() tipo_venta: string;
  @Expose() tipo_pago: string;
  @Expose() subtotal: number;
  @Expose() descuento: number;
  @Expose() total: number;

  @Expose()
  @Type(() => ClienteResumenDto)
  clientes: ClienteResumenDto;

  @Expose()
  @Type(() => EmpleadoResumenDto)
  empleados: EmpleadoResumenDto;

  @Expose()
  @Type(() => DetalleVentaResumenDto)
  detalleventas: DetalleVentaResumenDto[];
}
