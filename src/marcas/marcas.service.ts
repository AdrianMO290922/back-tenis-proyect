import { Injectable } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MarcasService {
  constructor(private prisma: PrismaService) {}

  async create(createMarcaDto: CreateMarcaDto) {
    return await this.prisma.marcas.create({
      data: createMarcaDto,
    });
  }

  async findAll() {
    return await this.prisma.marcas.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.marcas.findUnique({ where: { id } });
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto) {
    return await this.prisma.marcas.update({
      where: { id },
      data: updateMarcaDto ,
    });
  }

  async remove(id: number) {
    return await this.prisma.marcas.delete({ where: { id } });
  }
}
