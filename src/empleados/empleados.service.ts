import { Injectable } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmpleadosService {
    constructor(private prisma: PrismaService) {}
  
  create(createEmpleadoDto: CreateEmpleadoDto) {
    return this.prisma.empleados.create({data:{...createEmpleadoDto}});
  }

  findAll() {
    return this.prisma.empleados.findMany();
  }

  findOne(id: number) {
    return this.prisma.empleados.findUnique({where :{id}});
  }

  update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.prisma.empleados.update({where:{id}, data:{...updateEmpleadoDto}});
  }

  remove(id: number) {
    return this.prisma.empleados.delete({where:{id}});
  }
}
