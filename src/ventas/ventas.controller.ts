import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Response } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { VentasService } from './ventas.service';
import { VentasReportService } from './reportes/ventas-report.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import type { Response as ExpressResponse } from 'express';

@ApiTags('Ventas')
@Controller('ventas')
export class VentasController {
  constructor(
    private readonly ventasService: VentasService,
    private readonly reportService: VentasReportService,
  ) { }

  @Post()
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventasService.create(createVentaDto);
  }

  @Get()
  findAll() {
    return this.ventasService.findAll();
  }

  @Get('reporte/pdf')
  @ApiOperation({ 
    summary: 'Generar reporte de ventas en PDF',
    description: 'Genera un reporte PDF profesional con todas las ventas en un rango de fechas especificado. El reporte muestra cada producto vendido con su talla, cantidad, precio unitario y vendedor.'
  })
  @ApiQuery({ 
    name: 'fechaInicio', 
    type: 'string',
    description: 'Fecha de inicio del reporte (formato: YYYY-MM-DD)',
    example: '2024-10-01'
  })
  @ApiQuery({ 
    name: 'fechaFin', 
    type: 'string',
    description: 'Fecha de fin del reporte (formato: YYYY-MM-DD)',
    example: '2024-10-31'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'PDF generado exitosamente',
    content: {
      'application/pdf': {}
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Parámetros de fecha inválidos'
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error al generar el reporte'
  })
  async generarReportePDF(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
    @Response() res: ExpressResponse,
  ) {
    try {
      // Obtener ventas directamente de la BD en el rango de fechas
      const ventasFiltradas = await this.ventasService.findByDateRange(
        fechaInicio,
        fechaFin,
      );

      // Generar PDF
      const pdfBuffer = await this.reportService.generarReporteVentas(
        ventasFiltradas,
        fechaInicio,
        fechaFin,
      );

      // Configurar headers de respuesta
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="reporte-ventas-${fechaInicio}_${fechaFin}.pdf"`,
      );
      res.setHeader('Content-Length', pdfBuffer.length);

      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).json({
        message: 'Error al generar el reporte PDF',
        error: error.message,
      });
    }
  }

  @Get('cliente/:clienteId')
  findByCliente(@Param('clienteId') clienteId: string) {
    return this.ventasService.findByCliente(+clienteId);
  }

  @Get('empleado/:empleadoId')
  findByEmpleado(@Param('empleadoId') empleadoId: string) {
    return this.ventasService.findByEmpleado(+empleadoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventasService.update(+id, updateVentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventasService.remove(+id);
  }
}
