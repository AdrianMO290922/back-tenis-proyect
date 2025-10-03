import { PartialType } from '@nestjs/mapped-types';
import { CreateInventarioDto } from './create-inventario.dto';

export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {}