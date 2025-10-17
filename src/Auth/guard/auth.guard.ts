import { Injectable,CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import type { JwtPayload } from "../types/jwt.payload.type";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService)  {}

    async canActivate(context: ExecutionContext):Promise <boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        console.log('Encabezado Authorization:', request.headers.authorization); // Log del encabezado completo
    console.log('Token extraído:', token); // Log del token extraído
        if (token === undefined){
            throw new UnauthorizedException('No se pudo extraer el token');
        }

        try {
            const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
                //secret: process.env.JWT_SECRET || 'defaultSecret',
                secret:'SECRET',
            });
         
            request['jwt'] = payload;
        } catch (error) {
            console.error('Error al validar el token:', error.message); // Log del error
            throw new UnauthorizedException('Token no válido');
        }

        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}