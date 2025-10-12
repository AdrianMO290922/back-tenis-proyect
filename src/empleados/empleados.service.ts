import { Injectable } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmpleadosService {
  constructor(private prisma: PrismaService) {}
  
  async create(createEmpleadoDto: CreateEmpleadoDto) {
    return await this.prisma.empleados.create({ data: createEmpleadoDto });
  }

  async findAll() {
    return await this.prisma.empleados.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.empleados.findUnique({ where: { id } });
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    return await this.prisma.empleados.update({
      where: { id },
      data: updateEmpleadoDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.empleados.delete({ where: { id } });
  }
}