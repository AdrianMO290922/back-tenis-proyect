import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  async create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return await this.empleadosService.create(createEmpleadoDto);
  }

  @Get()
  async findAll() {
    return await this.empleadosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.empleadosService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEmpleadoDto: UpdateEmpleadoDto) {
    return await this.empleadosService.update(+id, updateEmpleadoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.empleadosService.remove(+id);
  }
}