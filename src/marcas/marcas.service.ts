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
      throw ErrorManager.createSignatureError('Error al crear la marca');
    }
  }

  async findAll() {
    try {
      const marcas = await this.prisma.marcas.findMany();
      return marcas;
    } catch (error) {
      throw ErrorManager.createSignatureError('Error al obtener las marcas');
    }
  }

  async findOne(id: number) {
    try {
      const marca = await this.prisma.marcas.findUnique({ where: { id } });
      if (!marca) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Marca no encontrada',
        });
      }
      return marca;
    } catch (error) {
      throw ErrorManager.createSignatureError('Error al obtener la marca');
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
          message: 'No se pudo actualizar: marca no encontrada',
        });
      }
      return marca;
    } catch (error) {
      throw ErrorManager.createSignatureError('Error al actualizar la marca');
    }
  }

  async remove(id: number) {
    try {
      const marca = await this.prisma.marcas.delete({ where: { id } });
      if (!marca) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se pudo eliminar: marca no encontrada',
        });
      }
      return marca;
    } catch (error) {
      throw ErrorManager.createSignatureError('Error al eliminar la marca');
    }
  }
}
