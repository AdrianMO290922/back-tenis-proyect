import { Module } from '@nestjs/common';
import { DetalleVentasService } from './detalle-ventas.service';
import { DetalleVentasController } from './detalle-ventas.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DetalleVentasController],
  providers: [DetalleVentasService],
  exports: [DetalleVentasService],
})
export class DetalleVentasModule {}
