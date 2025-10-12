import { Injectable } from '@nestjs/common';
import { CreateDomicilioDto } from './dto/create-domicilio.dto';
import { UpdateDomicilioDto } from './dto/update-domicilio.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DomiciliosService {
  constructor(private prisma: PrismaService) {}

  async create(createDomicilioDto: CreateDomicilioDto) {
    return await this.prisma.domicilios.create({ data: createDomicilioDto });
  }

  async findAll() {
    return await this.prisma.domicilios.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.domicilios.findUnique({ where: { id } });
  }

  async update(id: number, updateDomicilioDto: UpdateDomicilioDto) {
    return await this.prisma.domicilios.update({
      where: { id },
      data: updateDomicilioDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.domicilios.delete({ where: { id } });
  }
}