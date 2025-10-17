import { Injectable } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class MarcasService {
  constructor(private prisma: PrismaService) {}

  async create(createMarcaDto: CreateMarcaDto) {
    try {
      const marca = await this.prisma.marcas.create({
        data: createMarcaDto,
      });
      return marca;
    } catch (error) {
      // Manejo del error con tu ErrorManager existente
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll() {
    try {
      const marcas = await this.prisma.marcas.findMany();
      return marcas;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const marca = await this.prisma.marcas.findUnique({ where: { id } });
      if (!marca) {
        // Aquí lanzamos un error personalizado
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `La marca con id ${id} no existe`,
        });
      }
      return marca;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: number, updateMarcaDto: UpdateMarcaDto) {
    try {
      const marca = await this.prisma.marcas.update({
        where: { id },
        data: updateMarcaDto,
      });
      if (!marca) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `No se pudo actualizar: la marca con id ${id} no existe`,
        });
      }
      return marca;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: number) {
    try {
      const marca = await this.prisma.marcas.delete({ where: { id } });
      if (!marca) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `No se pudo eliminar: la marca con id ${id} no existe`,
        });
      }
      return marca;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
