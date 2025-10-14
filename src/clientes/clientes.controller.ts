//import { Controller } from '@nestjs/common';
import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { ClientesService } from '././clientes.service';
import { Prisma } from '@prisma/client';
import { CrearteClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
    constructor(private readonly clienteService: ClientesService) {}

    @Post()
    async create(@Body() crearteClienteDto: CrearteClienteDto) {
        return await this.clienteService.create(crearteClienteDto);
    }

    @Get()
    async findAll() {
        return await this.clienteService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const clienteId = Number(id);
        return await this.clienteService.findOne(clienteId);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateClienteDto: UpdateClienteDto) {
        const clienteId = Number(id);
        const updatedCliente = await this.clienteService.update(clienteId, updateClienteDto);
        return updatedCliente;
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const clienteId = Number(id);
        return await this.clienteService.delete(clienteId);
    }
}
