import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {
  constructor(private prisma: PrismaService) { }

  async create(createVentaDto: CreateVentaDto) {
  // Usar transacción para asegurar integridad
  return this.prisma.$transaction(async (prisma) => {
    // 1. Crear la venta
    const venta = await prisma.ventas.create({
      data: {
        fecha: createVentaDto.fecha || new Date(),
        tipo_venta: createVentaDto.tipo_venta,
        tipo_pago: createVentaDto.tipo_pago,
        cliente_id: createVentaDto.cliente_id || null,
        empleado_id: createVentaDto.empleado_id,
        subtotal: createVentaDto.subtotal || 0,
        descuento: createVentaDto.descuento || 0,
        total: createVentaDto.total,
      },
    });

    // 2. Crear detalles y descontar inventario
    for (const detalle of createVentaDto.detalles) {
      // Verificar stock disponible
      const inventario = await prisma.inventarios.findUnique({
        where: { id: detalle.inventario_id },
      });

      if (!inventario) {
        throw new Error(`Inventario ${detalle.inventario_id} no encontrado`);
      }

      if (inventario.cantidad < detalle.cantidad) {
        throw new Error(
          `Stock insuficiente para inventario ${detalle.inventario_id}. Disponible: ${inventario.cantidad}, Solicitado: ${detalle.cantidad}`
        );
      }

      // Crear detalle de venta
      await prisma.detalleventas.create({
        data: {
          venta_id: venta.id,
          inventario_id: detalle.inventario_id,
          cantidad: detalle.cantidad,
          total: detalle.total,
        },
      });

      // Descontar del inventario
      await prisma.inventarios.update({
        where: { id: detalle.inventario_id },
        data: {
          cantidad: {
            decrement: detalle.cantidad,
          },
        },
      });
    }

    // 3. Retornar la venta completa con todos sus includes
    return prisma.ventas.findUnique({
      where: { id: venta.id },
      include: {
        clientes: true,
        empleados: true,
        detalleventas: {
          include: {
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
        },
      },
    });
  });
}

  async findAll() {
    return this.prisma.ventas.findMany({
      include: {
        clientes: true,
        empleados: true,
        detalleventas: {
          include: {
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
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.ventas.findUnique({
      where: { id },
      include: {
        clientes: true,
        empleados: true,
        detalleventas: {
          include: {
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
        },
      },
    });
  }

  async update(id: number, updateVentaDto: UpdateVentaDto) {
    return this.prisma.ventas.update({
      where: { id },
      data: updateVentaDto,
      include: {
        clientes: true,
        empleados: true,
        detalleventas: {
          include: {
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
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.ventas.delete({
      where: { id },
    });
  }

  async findByCliente(clienteId: number) {
    return this.prisma.ventas.findMany({
      where: { cliente_id: clienteId },
      include: {
        clientes: true,
        empleados: true,
        detalleventas: {
          include: {
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
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findByEmpleado(empleadoId: number) {
    return this.prisma.ventas.findMany({
      where: { empleado_id: empleadoId },
      include: {
        clientes: true,
        empleados: true,
        detalleventas: {
          include: {
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
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findByDateRange(fechaInicio: string, fechaFin: string) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    fin.setHours(23, 59, 59, 999);

    return this.prisma.ventas.findMany({
      where: {
        fecha: {
          gte: inicio,
          lte: fin,
        },
      },
      include: {
        clientes: true,
        empleados: true,
        detalleventas: {
          include: {
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
        },
      },
      orderBy: {
        fecha: 'asc',
      },
    });
  }
}
