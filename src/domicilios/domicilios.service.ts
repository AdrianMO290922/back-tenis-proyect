import { Injectable } from '@nestjs/common';
import { CreateDomicilioDto } from './dto/create-domicilio.dto';
import { UpdateDomicilioDto } from './dto/update-domicilio.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DomiciliosService {
  constructor( private prisma: PrismaService){}

  create(createDomicilioDto: CreateDomicilioDto) {
    return 'This action adds a new domicilio';
  }

  findAll() {
return "blabla";
  }

  findOne(id: number) {
    return `This action returns a #${id} domicilio`;
  }

  update(id: number, updateDomicilioDto: UpdateDomicilioDto) {
    return `This action updates a #${id} domicilio`;
  }

  remove(id: number) {
    return `This action removes a #${id} domicilio`;
  }
}
