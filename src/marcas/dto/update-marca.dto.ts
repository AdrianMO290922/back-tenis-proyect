import { PartialType } from '@nestjs/mapped-types';
import { CreateMarcaDto } from './create-marca.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateMarcaDto extends PartialType(CreateMarcaDto) {
  @IsString()
  @IsOptional()
  @MaxLength(45)
  nombre?: string;
}
