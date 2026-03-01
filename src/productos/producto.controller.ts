import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { plainToInstance } from 'class-transformer';
import { ClientResponseDto } from './dto/response-inventario-dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/Auth/guard/auth.guard';
import { RolesGuard } from 'src/Auth/guard/roles.guard';
import { Roles } from 'src/Auth/decorators/roles.decorator';
import { Rol } from 'src/empleados/dto/create-empleado.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto) {
    const productoEntity = await this.productoService.create(createProductoDto);
    return plainToInstance(ClientResponseDto, productoEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Get()
  async findAll() {
    const productos = await this.productoService.findAll();
    return plainToInstance(ClientResponseDto, productos, {
      excludeExtraneousValues: true, 
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productoEntity = await this.productoService.findOne(+id);
    return plainToInstance(ClientResponseDto, productoEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Get('categoria/:categoriaId')
  findByCategoria(@Param('categoriaId') categoriaId: string) {
    return this.productoService.findByCategoria(+categoriaId);
  }

  @Get('marca/:marcaId')
  findByMarca(@Param('marcaId') marcaId: string) {
    return this.productoService.findByMarca(+marcaId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  async update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    const productoEntity = await this.productoService.update(+id, updateProductoDto);
    return plainToInstance(ClientResponseDto, productoEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.productoService.remove(+id);
  }
}