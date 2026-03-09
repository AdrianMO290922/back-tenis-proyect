import { SetMetadata } from '@nestjs/common';
import { Rol } from 'src/empleados/dto/create-empleado.dto';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Rol[]) => SetMetadata(ROLES_KEY, roles);
