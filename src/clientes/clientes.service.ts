import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

   // async create(data: Prisma.ClienteCreateInput) {
     //   return this.prisma.clientes.create({ data });
   // }

  async findAll() {
    return this.prisma.clientes.findMany();
  }

  async findOne(id: string) {
    return this.prisma.clientes.findUnique({ where: { id } });
  }

 // async update(id: string, data: Prisma.ClienteUpdateInput) {
  //   return this.prisma.clientes.update({ where: { id }, data });
  // }

  async delete(id: string) {
    return this.prisma.clientes.delete({ where: { id } });
  }
}
