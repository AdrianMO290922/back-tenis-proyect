import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEmail,
  IsDateString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateClienteDto {
  @IsString()
  nombres: string;

  @IsString()
  apellido_p: string;

  @IsOptional()
  @IsString()
  apellido_m?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsDateString()
  fecha_nacimiento?: string;

  @IsString()
  @MinLength(6,{ message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
