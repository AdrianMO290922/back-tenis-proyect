import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { plainToInstance } from 'class-transformer';
import { ClientResponseDto } from './dto/response-inventario-dto';
import { Prisma } from '@prisma/client';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}
    @Post()
    async create(@Body() createInventarioDto: CreateInventarioDto) {
        const inventarioEntity = await this.inventarioService.create(createInventarioDto);
        return plainToInstance(ClientResponseDto, inventarioEntity, {
        excludeExtraneousValues: true, 
    });
    }

    @Get()
    async findAll() {
        const inventarios = await this.inventarioService.findAll();
        return plainToInstance(ClientResponseDto, inventarios, {
        excludeExtraneousValues: true, 
        });
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const inventarioEntity = await this.inventarioService.findOne(id);
        return plainToInstance(ClientResponseDto, inventarioEntity, {
        excludeExtraneousValues: true, 
        });
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateInventarioDto: UpdateInventarioDto) {
        const entity = await this.inventarioService.update(+id, updateInventarioDto);
        return plainToInstance(ClientResponseDto, entity, {
            excludeExtraneousValues: true,
        });
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.inventarioService.remove(+id);
    }
}