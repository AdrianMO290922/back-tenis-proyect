import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { VentasReportService } from './reportes/ventas-report.service';

@Module({
  imports: [PrismaModule],
  controllers: [VentasController],
  providers: [VentasService, VentasReportService],
  exports: [VentasService, VentasReportService],
})
export class VentasModule { }
