import { IsEmail, IsString } from "class-validator"

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
    @IsString()
    rol:string;
}