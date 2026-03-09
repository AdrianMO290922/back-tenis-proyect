import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Rol } from 'src/empleados/dto/create-empleado.dto';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        //Leer los roles requeridos del decorador @Roles()
        const requiredRoles = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        //Si no hay @Roles() en el endpoint, se permite el acceso
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        // Obtener el payload JWT que AuthGuard ya adjuntó al request
        const request = context.switchToHttp().getRequest();
        const userPayload = request['jwt'];

        //Verificar si el rol del usuario está en los roles permitidos
        const hasRole = requiredRoles.includes(userPayload.rol as Rol);

        if (!hasRole) {
            throw new ForbiddenException(
                `Acceso denegado. Se requiere uno de los siguientes roles: ${requiredRoles.join(', ')}`,
            );
        }

        return true;
    }
}
