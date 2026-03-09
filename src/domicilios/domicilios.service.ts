import { Injectable } from '@nestjs/common';
import { CreateDomicilioDto } from './dto/create-domicilio.dto';
import { UpdateDomicilioDto } from './dto/update-domicilio.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class DomiciliosService {
  constructor(private prisma: PrismaService) {}

  async create(createDomicilioDto: CreateDomicilioDto) {
    return await this.prisma.domicilios.create({ data: createDomicilioDto });
  }

  async findAll() {
    return await this.prisma.domicilios.findMany();
  }

  // aqui le agregue el traicach que valida que exista el domicilio jeje
  async findOne(id: number) {
    try {
      const domicilio = await this.prisma.domicilios.findUnique({
        where: { id },
      });
      if (!domicilio) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El domicilio con id ${id} no existe`,
        });
      }
      return domicilio;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: number, updateDomicilioDto: UpdateDomicilioDto) {
    try {
      const updatedDomicilio = await this.prisma.domicilios.update({
        where: { id },
        data: updateDomicilioDto,
      });
      if (!updatedDomicilio) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El domicilio con id ${id} no existe`,
        });
      }
      return updatedDomicilio;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: number) {
    try {
      const deletedDomicilio = await this.prisma.domicilios.delete({ where: { id } });
      if (!deletedDomicilio) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `El domicilio con id ${id} no existe`,
        });
      }
      return deletedDomicilio;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
