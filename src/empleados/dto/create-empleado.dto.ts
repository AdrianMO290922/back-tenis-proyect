import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
  IsEmail,
} from 'class-validator';

export enum Rol {
  ADMIN = 'Admin',
  EMPLOYEE = 'Employee',
}

export class CreateEmpleadoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellido_p?: string;

  @IsOptional()
  @IsString()
  apellido_m?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(Rol, { message: 'El rol debe ser Admin o Employee' })
  rol?: Rol;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
