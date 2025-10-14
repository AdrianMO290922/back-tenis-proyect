import { Prisma } from '@prisma/client';

export class DetalleVenta {
  id: number;
  venta_id: number;
  inventario_id: number;
  cantidad: number;
  total: number;
  created_at: Date;
}
