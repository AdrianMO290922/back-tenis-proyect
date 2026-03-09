import { Injectable } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class InventarioService {
  constructor(private prisma: PrismaService) {}

  async create(createInvetarioDto: CreateInventarioDto) {
    return await this.prisma.inventarios.create({
      data: createInvetarioDto,
      include: {
        productos: true,
      },
    });
  }

  async findAll() {
    return this.prisma.inventarios.findMany(
      {
        include: {
          productos: true,
        },
      }
    );
  }

  async findOne(id: number) {
    try {
      const inventario = await this.prisma.inventarios.findUnique({ 
        where: { id }, 
        include: { productos: true } 
      });
      if (!inventario) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El inventario no existe`,
        });
      }
      return inventario;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: number, updateInventarioDto: UpdateInventarioDto) {
    try {
      const updatedInventario = await this.prisma.inventarios.update({ 
        where: { id }, 
        data: updateInventarioDto,
        include: { productos: true }
      });
      if (!updatedInventario) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El inventario no existe`,
        });
      }
      return updatedInventario;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: number) {
    try {
      const deletedInventario = await this.prisma.inventarios.delete({ where: { id } });
      if (!deletedInventario) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El inventario no existe`,
        });
      }
      return deletedInventario;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findByProducto(productoId: number) {
    return this.prisma.inventarios.findMany({
      where: { producto_id: productoId },
      include: { productos: true },
    });
  }
}
