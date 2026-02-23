import { Body, Controller, Post, Get, Request, UnauthorizedException, UseGuards,Req, Res,Query } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { EmpleadosService } from "src/empleados/empleados.service";
import type { JwtPayload } from "./types/jwt.payload.type";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./guard/auth.guard";
import { AuthGuard as PassaportAuthGuard } from '@nestjs/passport';
import { CreateEmpleadoDto } from "src/empleados/dto/create-empleado.dto";
import { AuthService } from "./auth.service";
import { ErrorManager } from "src/utils/error.manager";

@Controller('auth')
export class AuthController {
constructor(private readonly empleadoService: EmpleadosService,
            private readonly jwtService: JwtService,
            private readonly authService: AuthService){}
@Get('google')
    @UseGuards(PassaportAuthGuard('google'))
    async googleLogin() {
    // Redirige a Google
    }

    @Get('google/callback')
    @UseGuards(PassaportAuthGuard('google'))
    async googleCallback(@Req() req, @Res() res) {
    const identity = req.user;

    // Lógica de Salida: Reutilizamos la misma redirección que GitHub
    if (!identity.empleado_id) {
        return res.redirect(`${process.env.FRONTEND_URL}/register-complete?oauthId=${identity.id}`);
    }

    return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    }
@Get('github')
  @UseGuards(PassaportAuthGuard('github'))
  async githubLogin() {
    // Inicia el flujo hacia GitHub
  }

  @Get('github/callback')
  @UseGuards(PassaportAuthGuard('github'))
  async githubCallback(@Req() req, @Res() res) {
    const identity = req.user;

    // Lógica de Salida:
    // Si la identidad NO tiene empleado_id, mandamos al front a registrarse
    if (!identity.empleado_id) {
      return res.redirect(`${process.env.FRONTEND_URL}/register-complete?oauthId=${identity.id}`);
    }

    // Si YA tiene empleado_id, generamos el JWT de sesión (esto lo veremos después)
    return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
  @Post('register-complete')
    async registerComplete(
    @Body() body: CreateEmpleadoDto,
    @Query('oauthId') oauthId: string
    ) {
    const id = parseInt(oauthId, 10);
    
    if (isNaN(id)) {
        throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'ID de OAuth inválido',
        });
    }

    return await this.authService.completeRegistration(body, id);
    }

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