import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Prisma } from '@prisma/client';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}
    @Post()
    async create(@Body() createInventarioDto: CreateInventarioDto) {
        return this.inventarioService.create(createInventarioDto);
    }

    @Get()
    async findAll() {
        return this.inventarioService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.inventarioService.findOne(+id);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateInventarioDto: UpdateInventarioDto) {
        return this.inventarioService.update(+id, updateInventarioDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.inventarioService.remove(+id);
    }
}