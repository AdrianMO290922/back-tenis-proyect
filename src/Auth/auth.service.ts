import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ErrorManager } from '../utils/error.manager';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateOrCreateOAuthUser(data: {
    provider: string;
    providerId: string;
    email: string;
    nombre?: string | null;
    apellido_p?: string | null;
  }) {
    try {
      //Buscar si la identidad OAuth ya existe
      const existingIdentity = await this.prisma.oauth_identities.findUnique({
        where: {
          provider_provider_id: {
            provider: data.provider,
            provider_id: data.providerId,
          },
        },
        include: { empleado: true },
      });

      // Retornamos si existe
      if (existingIdentity && existingIdentity.empleado_id) {
        return existingIdentity;
      }

      // Si falta vincular empleado
      if (existingIdentity && !existingIdentity.empleado_id) {
        const empleado = await this.findOrCreateEmpleado(data);
        return await this.prisma.oauth_identities.update({
          where: { id: existingIdentity.id },
          data: { empleado_id: empleado.id },
          include: { empleado: true },
        });
      }

      // 4. No existe la identidad → buscar/crear empleado y crear identidad vinculada
      const empleado = await this.findOrCreateEmpleado(data);
      return await this.prisma.oauth_identities.create({
        data: {
          provider: data.provider,
          provider_id: data.providerId,
          email: data.email,
          empleado_id: empleado.id,
        },
        include: { empleado: true },
      });

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  private async findOrCreateEmpleado(data: {
    email: string;
    nombre?: string | null;
    apellido_p?: string | null;
  }) {
    // Buscar empleado existente por email
    const existingEmpleado = await this.prisma.empleados.findUnique({
      where: { email: data.email },
    });

    if (existingEmpleado) {
      return existingEmpleado;
    }

    // Crear nuevo empleado con datos del proveedor OAuth
    return await this.prisma.empleados.create({
      data: {
        email: data.email,
        nombre: data.nombre || undefined,
        apellido_p: data.apellido_p || undefined,
        rol: 'Employee',
        activo: true,
      },
    });
  }
}