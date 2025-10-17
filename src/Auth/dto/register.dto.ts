import { IsEmail, IsString, IsEnum } from "class-validator"
import { Rol } from "src/empleados/dto/create-empleado.dto";

export class RegisterDto {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    nombre: string;
    @IsString()
    apellido_p:string;
    @IsString()
    apellido_m:string;
    @IsEnum(Rol, {message:'El rol debe ser Admin o Employee'})
    rol:Rol;
}