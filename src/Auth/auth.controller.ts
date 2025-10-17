import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { EmpleadosService } from "src/empleados/empleados.service";

@Controller('auth')
export class AuthController {
constructor(private readonly empleadoService: EmpleadosService){}

@Post('register')
    async register(@Body() { email, password, nombre, apellido_p, apellido_m, rol }: RegisterDto){
        await this.empleadoService.create({ email, password, nombre, apellido_p, apellido_m, rol });

    }
@Post('login')
    async login(@Body() { email, password }: LoginDto){
        const empleado = await this.empleadoService.findByEmail(email);
        if(empleado == null){
            throw new UnauthorizedException('Credenciales invalidas');
        }
        if(empleado.password !== password){
            throw new UnauthorizedException('Credenciales invalidas');
        }
        return {message: 'Login exitoso'}

    } 
}