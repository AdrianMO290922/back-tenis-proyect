import { IsOptional, IsString } from "class-validator";

export class CrearteClienteDto{
    @IsString()
    nombres:string;
    @IsString()
    apellido_p:string;
    @IsString()
    @IsOptional()
    apellido_m?:string;
    @IsString()
    telefono:string;
    @IsString()
    email:string;
    @IsOptional()
    fecha_nacimiento?:Date;
}