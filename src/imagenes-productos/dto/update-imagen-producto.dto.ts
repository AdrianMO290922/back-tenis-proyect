import { PartialType } from '@nestjs/mapped-types';
import { CreateImagenProductoDto } from './create-imagen-producto.dto';

export class UpdateImagenProductoDto extends PartialType(CreateImagenProductoDto) {}