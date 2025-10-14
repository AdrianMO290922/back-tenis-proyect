import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleVentasService } from './detalle-ventas.service';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';

@Controller('detalle-ventas')
export class DetalleVentasController {
  constructor(private readonly detalleVentasService: DetalleVentasService) {}

  @Post()
  async create(@Body() createDetalleVentaDto: CreateDetalleVentaDto) {
    return await this.detalleVentasService.create(createDetalleVentaDto);
  }

  @Get()
  async findAll() {
    return await this.detalleVentasService.findAll();
  }

  @Get('venta/:ventaId')
  async findByVenta(@Param('ventaId') ventaId: string) {
    return await this.detalleVentasService.findByVenta(+ventaId);
  }

  @Get('inventario/:inventarioId')
  async findByInventario(@Param('inventarioId') inventarioId: string) {
    return await this.detalleVentasService.findByInventario(+inventarioId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.detalleVentasService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDetalleVentaDto: UpdateDetalleVentaDto) {
    return await this.detalleVentasService.update(+id, updateDetalleVentaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.detalleVentasService.remove(+id);
  }
}