import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { plainToInstance } from 'class-transformer';
import { MarcaResponseDto } from './dto/response-marca.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Post()
  async create(@Body() createMarcaDto: CreateMarcaDto) {
    const marcaEntity = await this.marcasService.create(createMarcaDto);
    return plainToInstance(MarcaResponseDto, marcaEntity, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll() {
    const marcasEntity = await this.marcasService.findAll();
    return plainToInstance(MarcaResponseDto, marcasEntity, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const marcaEntity = await this.marcasService.findOne(+id);
    return plainToInstance(MarcaResponseDto, marcaEntity, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMarcaDto: UpdateMarcaDto) {
    const marcaEntity = await this.marcasService.update(+id, updateMarcaDto);
    return plainToInstance(MarcaResponseDto, marcaEntity, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.marcasService.remove(+id);
  }
}
