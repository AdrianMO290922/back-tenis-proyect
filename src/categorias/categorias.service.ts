import { Injectable } from "@nestjs/common";
import { CreateCategoriaDto } from "./dto/create-categoria.dto"; 
import { UpdateCategoriaDto } from "./dto/update-categoria.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ErrorManager } from "src/utils/error.manager";

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const categoria = await this.prisma.categorias.create({
        data: createCategoriaDto,
      });
      return categoria;
    } catch (error) {
      throw ErrorManager.createSignatureError('Error al crear la categoría');
    }
  }

  async findAll() {
    try {
      const categorias = await this.prisma.categorias.findMany();
      return categorias;
    } catch (error) {
      throw ErrorManager.createSignatureError('Error al obtener las categorías');
    }
  }

  async findOne(id: number) {
    try {
      const categoria = await this.prisma.categorias.findUnique({
        where: { id },
      });
      if (!categoria) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Categoría no encontrada',
        });
      }
      return categoria;
    } catch (error) {
      throw ErrorManager.createSignatureError('Error al obtener la categoría');
    }
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      const categoria = await this.prisma.categorias.update({
        where: { id },
        data: updateCategoriaDto,
      });
      return categoria;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se pudo actualizar: categoría no encontrada',
        });
      }
      throw ErrorManager.createSignatureError('Error al actualizar la categoría');
    }
  }

  async remove(id: number) {
    try {
      const categoria = await this.prisma.categorias.delete({
        where: { id },
      });
      return categoria;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se pudo eliminar: categoría no encontrada',
        });
      }
      throw ErrorManager.createSignatureError('Error al eliminar la categoría');
    }
  }
}
