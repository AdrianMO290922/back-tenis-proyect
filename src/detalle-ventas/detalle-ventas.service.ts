import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';

@Injectable()
export class DetalleVentasService {
  constructor(private prisma: PrismaService) {}

  async create(createDetalleVentaDto: CreateDetalleVentaDto) {
    // Verificar que la venta existe
    const venta = await this.prisma.ventas.findUnique({
      where: { id: createDetalleVentaDto.venta_id },
    });

    if (!venta) {
      throw new Error('La venta especificada no existe');
    }

    // Verificar que el inventario existe
    const inventario = await this.prisma.inventarios.findUnique({
      where: { id: createDetalleVentaDto.inventario_id },
    });

    if (!inventario) {
      throw new Error('El inventario especificado no existe');
    }

    // Verificar que hay suficiente stock
    if (inventario.cantidad < createDetalleVentaDto.cantidad) {
      throw new Error('No hay suficiente stock disponible');
    }

    return this.prisma.detalleventas.create({
      data: createDetalleVentaDto,
      include: {
        ventas: {
          include: {
            clientes: true,
            empleados: true,
          },
        },
        inventarios: {
          include: {
            productos: {
              include: {
                categorias: true,
                marcas: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.detalleventas.findMany({
      include: {
        ventas: {
          include: {
            clientes: true,
            empleados: true,
          },
        },
        inventarios: {
          include: {
            productos: {
              include: {
                categorias: true,
                marcas: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.detalleventas.findUnique({
      where: { id },
      include: {
        ventas: {
          include: {
            clientes: true,
            empleados: true,
          },
        },
        inventarios: {
          include: {
            productos: {
              include: {
                categorias: true,
                marcas: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, updateDetalleVentaDto: UpdateDetalleVentaDto) {
    // Si se está actualizando la cantidad, verificar stock
    if (updateDetalleVentaDto.cantidad !== undefined) {
      const detalleActual = await this.prisma.detalleventas.findUnique({
        where: { id },
        include: {
          inventarios: true,
        },
      });

      if (!detalleActual) {
        throw new Error('El detalle de venta no existe');
      }

      const inventario = await this.prisma.inventarios.findUnique({
        where: { id: detalleActual.inventario_id },
      });

      if (!inventario) {
        throw new Error('El inventario no existe');
      }

      // Calcular la diferencia de cantidad
      const cantidadDiferencia = updateDetalleVentaDto.cantidad - detalleActual.cantidad;
      
      if (inventario.cantidad < cantidadDiferencia) {
        throw new Error('No hay suficiente stock disponible para esta actualización');
      }
    }

    return this.prisma.detalleventas.update({
      where: { id },
      data: updateDetalleVentaDto,
      include: {
        ventas: {
          include: {
            clientes: true,
            empleados: true,
          },
        },
        inventarios: {
          include: {
            productos: {
              include: {
                categorias: true,
                marcas: true,
              },
            },
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.detalleventas.delete({
      where: { id },
    });
  }

  async findByVenta(ventaId: number) {
    return this.prisma.detalleventas.findMany({
      where: { venta_id: ventaId },
      include: {
        ventas: {
          include: {
            clientes: true,
            empleados: true,
          },
        },
        inventarios: {
          include: {
            productos: {
              include: {
                categorias: true,
                marcas: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findByInventario(inventarioId: number) {
    return this.prisma.detalleventas.findMany({
      where: { inventario_id: inventarioId },
      include: {
        ventas: {
          include: {
            clientes: true,
            empleados: true,
          },
        },
        inventarios: {
          include: {
            productos: {
              include: {
                categorias: true,
                marcas: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
