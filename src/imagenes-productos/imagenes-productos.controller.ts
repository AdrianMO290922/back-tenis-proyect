import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ImagenesProductosService } from './imagenes-productos.service';
import { CreateImagenProductoDto } from './dto/create-imagen-producto.dto';
import { UpdateImagenProductoDto } from './dto/update-imagen-producto.dto';
import { AuthGuard } from 'src/Auth/guard/auth.guard';

@Controller('imagenes-productos')
export class ImagenesProductosController {
  constructor(private readonly imagenesProductosService: ImagenesProductosService) {}

  @Post()
  create(@Body() createImagenProductoDto: CreateImagenProductoDto) {
    return this.imagenesProductosService.create(createImagenProductoDto);
  }

  @Get()
  findAll() {
    return this.imagenesProductosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagenesProductosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImagenProductoDto: UpdateImagenProductoDto) {
    return this.imagenesProductosService.update(+id, updateImagenProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagenesProductosService.remove(+id);
  }
}