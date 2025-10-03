import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DomiciliosService } from './domicilios.service';
import { CreateDomicilioDto } from './dto/create-domicilio.dto';
import { UpdateDomicilioDto } from './dto/update-domicilio.dto';

@Controller('domicilios')
export class DomiciliosController {
  constructor(private readonly domiciliosService: DomiciliosService) {}

  @Post()
  create(@Body() createDomicilioDto: CreateDomicilioDto) {
    return this.domiciliosService.create(createDomicilioDto);
  }

  @Get()
  findAll() {
    return this.domiciliosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domiciliosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomicilioDto: UpdateDomicilioDto) {
    return this.domiciliosService.update(+id, updateDomicilioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domiciliosService.remove(+id);
  }
}
