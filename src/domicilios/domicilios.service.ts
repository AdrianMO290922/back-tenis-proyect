import { Injectable } from '@nestjs/common';
import { CreateDomicilioDto } from './dto/create-domicilio.dto';
import { UpdateDomicilioDto } from './dto/update-domicilio.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DomiciliosService {
  constructor( private prisma: PrismaService){}

  create(createDomicilioDto: CreateDomicilioDto) {
    return this.prisma.domicilios.create({data:{...createDomicilioDto}});
  }

  findAll() {
    return this.prisma.domicilios.findMany();
  }

  findOne(id: number) {
    return this.prisma.domicilios.findUnique({where: {id}});
  }

  update(id: number, updateDomicilioDto: UpdateDomicilioDto) {
    return this.prisma.domicilios.update({where:{id},data:{...updateDomicilioDto}});
  }

  remove(id: number) {
    return this.prisma.domicilios.delete({where:{id}});
  }
}
