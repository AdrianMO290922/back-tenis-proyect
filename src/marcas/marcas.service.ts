import { Injectable } from "@nestjs/common";
import { CreateMarcaDto } from "./dto/create-marca.dto"; 
import { UpdateMarcaDto } from "./dto/update-marca.dto";
import { PrismaService } from "src/prisma/prisma.service"; 

@Injectable()
export class MarcasService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMarcaDto) {
    const marca = await this.prisma.marcas.create({
      data: { nombre: dto.nombre },
    });
    return marca;
  }

  async findAll() {
    return await this.prisma.marcas.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.marcas.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateMarcaDto) {
    return await this.prisma.marcas.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(id: number) {
    return await this.prisma.marcas.delete({ where: { id } });
  }
}
