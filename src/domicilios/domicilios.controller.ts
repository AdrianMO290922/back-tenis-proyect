import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DomiciliosService } from './domicilios.service';
import { CreateDomicilioDto } from './dto/create-domicilio.dto';
import { UpdateDomicilioDto } from './dto/update-domicilio.dto';

@Controller('domicilios')
export class DomiciliosController {
  constructor(private readonly domiciliosService: DomiciliosService) {}

  @Post()
  async create(@Body() createDomicilioDto: CreateDomicilioDto) {
    return await this.domiciliosService.create(createDomicilioDto);
  }

  @Get()
  async findAll() {
    return await this.domiciliosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.domiciliosService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDomicilioDto: UpdateDomicilioDto) {
    return await this.domiciliosService.update(+id, updateDomicilioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.domiciliosService.remove(+id);
  }
}