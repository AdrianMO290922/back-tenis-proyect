import { Prisma } from '@prisma/client';

export class Venta implements Prisma.ventasGetPayload<{}> {
  id: number;
  fecha: Date;
  tipo_venta: string;
  tipo_pago: string;
  cliente_id: number | null;
  empleado_id: number;
  subtotal: Prisma.Decimal;
  descuento: Prisma.Decimal;
  total: Prisma.Decimal;
  created_at: Date;
  updated_at: Date;
}
