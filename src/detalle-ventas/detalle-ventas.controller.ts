import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleVentasService } from './detalle-ventas.service';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';

@Controller('detalle-ventas')
export class DetalleVentasController {
  constructor(private readonly detalleVentasService: DetalleVentasService) {}

  @Post()
  create(@Body() createDetalleVentaDto: CreateDetalleVentaDto) {
    return this.detalleVentasService.create(createDetalleVentaDto);
  }

  @Get()
  findAll() {
    return this.detalleVentasService.findAll();
  }

  @Get('venta/:ventaId')
  findByVenta(@Param('ventaId') ventaId: string) {
    return this.detalleVentasService.findByVenta(+ventaId);
  }

  @Get('inventario/:inventarioId')
  findByInventario(@Param('inventarioId') inventarioId: string) {
    return this.detalleVentasService.findByInventario(+inventarioId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleVentasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleVentaDto: UpdateDetalleVentaDto) {
    return this.detalleVentasService.update(+id, updateDetalleVentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleVentasService.remove(+id);
  }
}
