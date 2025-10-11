import { Prisma, tipo_pago_enum, tipo_venta_enum } from '@prisma/client';

export class Venta implements Prisma.ventasGetPayload<{}> {
  id: number;
  fecha: Date;
  tipo_venta: tipo_venta_enum;   
  tipo_pago: tipo_pago_enum;     
  cliente_id: number | null;
  empleado_id: number;
  subtotal: Prisma.Decimal;
  descuento: Prisma.Decimal;
  total: Prisma.Decimal;
  created_at: Date;
  updated_at: Date;
}
