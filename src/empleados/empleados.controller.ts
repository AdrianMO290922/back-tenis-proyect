import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,UseInterceptors,ClassSerializerInterceptor } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { AuthGuard } from 'src/Auth/guard/auth.guard';
import { plainToInstance } from 'class-transformer';
import { EmpleadoResponseDto } from './dto/response-empleado.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    const empleadoEntity = await this.empleadosService.create(createEmpleadoDto);
    return plainToInstance(EmpleadoResponseDto, empleadoEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Get()
  async findAll() {
    const empleadosEntity = await this.empleadosService.findAll();
    return plainToInstance(EmpleadoResponseDto, empleadosEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    const empleadoEntity = await this.empleadosService.findOne(+id);
    return plainToInstance(EmpleadoResponseDto, empleadoEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateEmpleadoDto: UpdateEmpleadoDto) {
    const updatedEmpleado = await this.empleadosService.update(+id, updateEmpleadoDto);
    return plainToInstance(EmpleadoResponseDto, updatedEmpleado, {
      excludeExtraneousValues: true, 
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return await this.empleadosService.remove(+id);
  }
}