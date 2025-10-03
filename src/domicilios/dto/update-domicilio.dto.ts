import { PartialType } from '@nestjs/mapped-types';
import { CreateDomicilioDto } from './create-domicilio.dto';

export class UpdateDomicilioDto extends PartialType(CreateDomicilioDto) {}
