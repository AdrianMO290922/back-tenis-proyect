import { TipoPagoEnum as tipo_pago_enum } from "../dto/create-venta.dto";
import { TipoVentaEnum as tipo_venta_enum } from "../dto/create-venta.dto";

export class Venta {
  id: number;
  fecha: Date;
  tipo_venta: tipo_venta_enum;   
  tipo_pago: tipo_pago_enum;     
  cliente_id: number | null;
  empleado_id: number;
  subtotal: number;
  descuento: number;
  total: number;
  created_at: Date;
  updated_at: Date;
}
