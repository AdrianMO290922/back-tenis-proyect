import { Body, Controller, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { EmpleadosService } from "src/empleados/empleados.service";
import type { JwtPayload } from "./types/jwt.payload.type";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./guard/auth.guard";

@Controller('auth')
export class AuthController {
constructor(private readonly empleadoService: EmpleadosService,
            private readonly jwtService: JwtService){}

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
        const payload: JwtPayload = {empleadoId: empleado.id, email: empleado.email || '', rol: empleado.rol};
        const access_token = await this.jwtService.signAsync(payload);
        return {message: 'Login exitoso', access_token}

    } 
    @Post('profile')
    @UseGuards(AuthGuard)
    Profile(@Request() {jwt}:{jwt:JwtPayload}) {
        return jwt;
    }
}