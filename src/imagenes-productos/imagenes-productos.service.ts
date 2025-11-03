import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImagenProductoDto } from './dto/create-imagen-producto.dto';
import { UpdateImagenProductoDto } from './dto/update-imagen-producto.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ImagenesProductosService {
  constructor(private prisma: PrismaService) {}

  async create(createImagenProductoDto: CreateImagenProductoDto) {
    try {
      // Verificar si el producto existe
      const producto = await this.prisma.productos.findUnique({
        where: { id: createImagenProductoDto.producto_id },
      });

      if (!producto) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El producto con id ${createImagenProductoDto.producto_id} no existe`,
        });
      }

      return await this.prisma.imagenes_productos.create({
        data: createImagenProductoDto,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.imagenes_productos.findMany({
        include: {
          productos: true,
        },
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const imagen = await this.prisma.imagenes_productos.findUnique({
        where: { id },
        include: {
          productos: true,
        },
      });

      if (!imagen) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `La imagen con id ${id} no existe`,
        });
      }

      return imagen;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: number, updateImagenProductoDto: UpdateImagenProductoDto) {
    try {
      // Verificar si la imagen existe
      const imagen = await this.prisma.imagenes_productos.findUnique({
        where: { id },
      });

      if (!imagen) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `La imagen con id ${id} no existe`,
        });
      }

      // Si se está actualizando el producto_id, verificar que el nuevo producto existe
      if (updateImagenProductoDto.producto_id) {
        const producto = await this.prisma.productos.findUnique({
          where: { id: updateImagenProductoDto.producto_id },
        });

        if (!producto) {
          throw new ErrorManager({
            type: 'NOT_FOUND',
            message: `El producto con id ${updateImagenProductoDto.producto_id} no existe`,
          });
        }
      }

      return await this.prisma.imagenes_productos.update({
        where: { id },
        data: updateImagenProductoDto,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: number) {
    try {
      // Verificar si la imagen existe
      const imagen = await this.prisma.imagenes_productos.findUnique({
        where: { id },
      });

      if (!imagen) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `La imagen con id ${id} no existe`,
        });
      }

      return await this.prisma.imagenes_productos.delete({
        where: { id },
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}