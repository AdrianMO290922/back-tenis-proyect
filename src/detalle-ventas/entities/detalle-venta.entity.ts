import { Prisma } from '@prisma/client';

export class DetalleVenta implements Prisma.detalleventasGetPayload<{}> {
  id: number;
  venta_id: number;
  inventario_id: number;
  cantidad: number;
  total: Prisma.Decimal;
  created_at: Date;
}
