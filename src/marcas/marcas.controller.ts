import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Prisma } from'@prisma/client'; 

@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Post()
  async create(@Body() createMarcaDto: CreateMarcaDto) {
    return this.marcasService.create(createMarcaDto);
  }

  @Get()
  async findAll() {
    return this.marcasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.marcasService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMarcaDto: UpdateMarcaDto) {
    return this.marcasService.update(+id, updateMarcaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.marcasService.remove(+id);
  }
}
