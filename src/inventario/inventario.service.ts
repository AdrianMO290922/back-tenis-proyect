import { Injectable } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class InventarioService {
  constructor(private prisma: PrismaService) {}

  async create(createInvetarioDto: CreateInventarioDto) {
    const createInventario = await this.prisma.inventarios.create({
      data: createInvetarioDto,
    });
    return createInventario;
  }

  async findAll() {
    return this.prisma.inventarios.findMany();
  }

  async findOne(id: number) {
    return this.prisma.inventarios.findUnique({ where: { id } });
  }

  async update(id: number, updateInventarioDto: UpdateInventarioDto) {
    return this.prisma.inventarios.update({
      where: { id },
      data: updateInventarioDto,
    });
  }

  async remove(id: number) {
    return this.prisma.inventarios.delete({ where: { id } });
  }
}
