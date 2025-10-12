import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CrearteClienteDto } from './dto/create-cliente.dto';
import { CreateCategoriaDto } from 'src/categorias/dto/create-categoria.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

   async create(crearteClienteDto: CrearteClienteDto) {
        const createCliente = await this.prisma.clientes.create({ data: {
            nombres: crearteClienteDto.nombres,
            apellido_p: crearteClienteDto.apellido_p,
            apellido_m: crearteClienteDto.apellido_m,
            telefono: crearteClienteDto.telefono,
            email: crearteClienteDto.email,
            fecha_nacimiento: crearteClienteDto.fecha_nacimiento,
            password: 'Sin password' // Set a default or hashed password here
         } });
        return createCliente;
    }

  async findAll() {
    return await this.prisma.clientes.findMany();
  }

  async findOne(id: number) {
    const cliente = await this.prisma.clientes.findUnique({ where: { id } });
    return cliente;
  }

 async update(id: number, updateClienteDto: UpdateClienteDto) {
     return await this.prisma.clientes.update({ where: { id }, data: updateClienteDto });
   }

  async delete(id: number) {
    return await this.prisma.clientes.delete({ where: { id } });
  }
}
