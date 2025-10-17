import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { AuthGuard } from 'src/Auth/guard/auth.guard';

@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return await this.empleadosService.create(createEmpleadoDto);
  }

  @Get()
  async findAll() {
    return await this.empleadosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.empleadosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateEmpleadoDto: UpdateEmpleadoDto) {
    return await this.empleadosService.update(+id, updateEmpleadoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return await this.empleadosService.remove(+id);
  }
}