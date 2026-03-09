import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { plainToInstance } from 'class-transformer';
import { CategoriaResponseDto } from './dto/response-categoria.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    const categoriaEntity = await this.categoriasService.create(createCategoriaDto);
    return plainToInstance(CategoriaResponseDto, categoriaEntity, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async findAll() {
    const categoriasEntity = await this.categoriasService.findAll();
    return plainToInstance(CategoriaResponseDto, categoriasEntity, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const categoriaEntity = await this.categoriasService.findOne(+id);
    return plainToInstance(CategoriaResponseDto, categoriaEntity, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    const categoriaEntity = await this.categoriasService.update(+id, updateCategoriaDto);
    return plainToInstance(CategoriaResponseDto, categoriaEntity, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.categoriasService.remove(+id);
  }
}
