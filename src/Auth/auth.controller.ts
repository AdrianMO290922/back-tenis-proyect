import { Body, Controller, Post } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { EmpleadosService } from "src/empleados/empleados.service";

@Controller('auth')
export class AuthController {
constructor(private readonly empleadoService: EmpleadosService){}

@Post('register')
    async register(@Body() registerDto: RegisterDto){

    }
@Post('login')
    async login(@Body() loginDto: LoginDto){

    } 
}