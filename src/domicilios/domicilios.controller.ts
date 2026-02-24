import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { DomiciliosService } from './domicilios.service';
import { CreateDomicilioDto } from './dto/create-domicilio.dto';
import { UpdateDomicilioDto } from './dto/update-domicilio.dto';
import { AuthGuard } from 'src/Auth/guard/auth.guard';
import { plainToInstance } from 'class-transformer';
import { DomicilioResponseDto } from './dto/response-domicilio.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('domicilios')
export class DomiciliosController {
  constructor(private readonly domiciliosService: DomiciliosService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createDomicilioDto: CreateDomicilioDto) {
    const domicilioEntity= await this.domiciliosService.create(createDomicilioDto);
    return plainToInstance(DomicilioResponseDto, domicilioEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Get()
  async findAll() {
    const domicilioEntity =  await this.domiciliosService.findAll();
    return plainToInstance(DomicilioResponseDto, domicilioEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const domicilioEntity = await this.domiciliosService.findOne(+id);
    return plainToInstance(DomicilioResponseDto, domicilioEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateDomicilioDto: UpdateDomicilioDto,
  ) {
    const domicilioEntity = await this.domiciliosService.update(+id, updateDomicilioDto);
    return plainToInstance(DomicilioResponseDto, domicilioEntity, {
      excludeExtraneousValues: true, 
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    const domicilioEntity = await this.domiciliosService.remove(+id);
    return plainToInstance(DomicilioResponseDto, domicilioEntity, {
      excludeExtraneousValues: true, 
    });
  }
}
