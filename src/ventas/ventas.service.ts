import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {
  constructor(private prisma: PrismaService) {}

  async create(createVentaDto: CreateVentaDto) {
    return this.prisma.ventas.create({
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
}
