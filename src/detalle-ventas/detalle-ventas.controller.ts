import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { DetalleVentasService } from './detalle-ventas.service';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';
import { DetalleVentaResponseDto } from './dto/response-detalle-venta.dto';
import { plainToInstance } from 'class-transformer';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('detalle-ventas')
export class DetalleVentasController {
  constructor(private readonly detalleVentasService: DetalleVentasService) {}

  @Post()
  async create(@Body() createDetalleVentaDto: CreateDetalleVentaDto) {
    const entity = await this.detalleVentasService.create(createDetalleVentaDto);
    return plainToInstance(DetalleVentaResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll() {
    const entities = await this.detalleVentasService.findAll();
    return plainToInstance(DetalleVentaResponseDto, entities, {
      excludeExtraneousValues: true,
    });
  }

  @Get('venta/:ventaId')
  async findByVenta(@Param('ventaId') ventaId: string) {
    const entities = await this.detalleVentasService.findByVenta(+ventaId);
    return plainToInstance(DetalleVentaResponseDto, entities, {
      excludeExtraneousValues: true,
    });
  }

  @Get('inventario/:inventarioId')
  async findByInventario(@Param('inventarioId') inventarioId: string) {
    const entities = await this.detalleVentasService.findByInventario(+inventarioId);
    return plainToInstance(DetalleVentaResponseDto, entities, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const entity = await this.detalleVentasService.findOne(+id);
    return plainToInstance(DetalleVentaResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDetalleVentaDto: UpdateDetalleVentaDto) {
    const entity = await this.detalleVentasService.update(+id, updateDetalleVentaDto);
    return plainToInstance(DetalleVentaResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.detalleVentasService.remove(+id);
  }
}