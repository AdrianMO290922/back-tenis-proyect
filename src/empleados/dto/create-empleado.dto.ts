import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export enum Rol {
  ADMIN = 'Admin',
  EMPLOYEE = 'Employee'
}

export class CreateEmpleadoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
    @IsString()
    @IsNotEmpty()
    apellido_p: string;
    @IsString()
    apellido_m?: string;
    @IsString()
    @MaxLength(15)
    telefono?: string;
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
    @IsEnum(Rol, {message:'El rol debe ser Admin o Employee'})
    rol: Rol;
    
}
