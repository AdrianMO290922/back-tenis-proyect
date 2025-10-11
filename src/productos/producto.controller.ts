import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Prisma } from '@prisma/client';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}
    @Post()
    async create(@Body() createProductoDto: CreateProductoDto) {
        return this.productoService.create(createProductoDto);
    }

    @Get()
    async findAll() {
        return this.productoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.productoService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateProductoDto: UpdateProductoDto) {
        return this.productoService.update(+id, updateProductoDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.productoService.remove(+id);
    }
}