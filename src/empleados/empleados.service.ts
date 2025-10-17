import { Injectable } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class EmpleadosService {
  constructor(private prisma: PrismaService) {}
  
  async create(createEmpleadoDto: CreateEmpleadoDto) {
    return await this.prisma.empleados.create({ data: createEmpleadoDto });
  }

  async findAll() {
    return await this.prisma.empleados.findMany();
  }
  async findByEmail(email: string) {
    try{
      const empleado = await this.prisma.empleados.findUnique({where: {email}});
      if(!empleado){
         throw new ErrorManager({
                type: 'NOT_FOUND',
                message: `El empleado con email ${email} no existe`,
              })
      }
      return empleado;

    }catch(error){
      throw ErrorManager.createSignatureError(error.message);

    }
    
  }

  async findOne(id: number) {
    try{
      const empleado = await this.prisma.empleados.findUnique({where: {id}});
      if(!empleado){
         throw new ErrorManager({
                type: 'NOT_FOUND',
                message: `El empleado con id ${id} no existe`,
              })
      }
      return empleado;

    }catch(error){
      throw ErrorManager.createSignatureError(error.message);

    }
    
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    try{
    const updatedEmpleado = await this.prisma.empleados.update({ where: { id }, data: updateEmpleadoDto });
    if (!updatedEmpleado) {
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: `El empleado con id ${id} no existe`,
      })
    }
    return updatedEmpleado;
    }catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: number) {
    try{
     const deletedEmpleado = await this.prisma.empleados.delete({ where: { id } });
    if (!deletedEmpleado) {
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: `El empleado con id ${id} no existe`,
      })
    }
    return deletedEmpleado;
  }catch(error){
    throw ErrorManager.createSignatureError(error.message);
  }
  }
}