import { Injectable } from '@nestjs/common';
import { CreateDomicilioDto } from './dto/create-domicilio.dto';
import { UpdateDomicilioDto } from './dto/update-domicilio.dto';

@Injectable()
export class DomiciliosService {
  create(createDomicilioDto: CreateDomicilioDto) {
    return 'This action adds a new domicilio';
  }

  findAll() {
    return `This action returns all domicilios`;
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
