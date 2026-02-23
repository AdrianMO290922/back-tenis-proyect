//import { Controller } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  UseGuards,
  Req,
  UseInterceptors, ClassSerializerInterceptor
} from '@nestjs/common';
import { ClientesService } from '././clientes.service';
import { Prisma } from '@prisma/client';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { AuthGuard } from 'src/Auth/guard/auth.guard';
import { plainToInstance } from 'class-transformer';
import { ClientResponseDto } from './dto/response-cliente-dto';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clienteService: ClientesService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createClienteDto: CreateClienteDto,
    @Req() request: Request,
  ) {
    const clientEntity = await this.clienteService.create(createClienteDto);
    return plainToInstance(ClientResponseDto, clientEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Get()
  async findAll() {
    const clientEntity = await this.clienteService.findAll();
    return plainToInstance(ClientResponseDto, clientEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const clienteId = Number(id);
    const clientEntity = await this.clienteService.findOne(clienteId);
    return plainToInstance(ClientResponseDto, clientEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    const clienteId = Number(id);
    const updatedCliente = await this.clienteService.update(
      clienteId,
      updateClienteDto,
    );
    return plainToInstance(ClientResponseDto, updatedCliente, {
      excludeExtraneousValues: true, 
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: number) {
    const clienteId = Number(id);
    return await this.clienteService.delete(clienteId);
  }
}
