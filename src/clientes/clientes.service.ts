import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { AuthService } from 'src/Auth/auth.service';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService, private authService: AuthService) {}

  async create(createClienteDto: CreateClienteDto) {
    // Cifrar la contraseña antes de guardar
    const hashedPassword = await this.authService.hashPassword(createClienteDto.password);
    createClienteDto.password = hashedPassword;
    const createCliente = await this.prisma.clientes.create({
      data: {
        ...createClienteDto,
        fecha_nacimiento: createClienteDto.fecha_nacimiento
          ? new Date(createClienteDto.fecha_nacimiento)
          : undefined,
      },
    });

    return createCliente;
  }

  async findAll() {
    return await this.prisma.clientes.findMany();
  }

  async findOne(id: number) {
    try {
      const cliente = await this.prisma.clientes.findUnique({ where: { id } });
      if (!cliente) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El cliente con id ${id} no existe`,
        });
      }
      return cliente;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    try {
      const updatedCliente = await this.prisma.clientes.update({
        where: { id },
        data: {
          ...updateClienteDto,
          fecha_nacimiento: updateClienteDto.fecha_nacimiento
            ? new Date(updateClienteDto.fecha_nacimiento)
            : undefined,
        },
      });
      if (!updatedCliente) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El cliente con id ${id} no existe`,
        });
      }

      return updatedCliente;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async delete(id: number) {
    try {
      const deletedCliente = await this.prisma.clientes.delete({
        where: { id },
      });
      if(!deletedCliente){
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El cliente con id ${id} no existe`,
        });
      }

      return deletedCliente;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
