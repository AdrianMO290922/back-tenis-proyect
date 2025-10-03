//import { Controller } from '@nestjs/common';
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClientesService } from '././clientes.service';
import { Prisma } from '@prisma/client';

@Controller('clientes')
export class ClientesController {
    constructor(private readonly clienteService: ClientesService) {}

    /*@Post()
    async create(@Body() data: Prisma.ClientesCreateInput) {
        return this.clienteService.create(data);
    }
*/
    @Get()
    async findAll() {
        return this.clienteService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.clienteService.findOne(id);
    }
/*
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Prisma.ClientesUpdateInput) {
        return this.clienteService.update(id, data);
    }
*/
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.clienteService.delete(id);
    }
}
