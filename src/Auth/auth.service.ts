import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ErrorManager } from '../utils/error.manager';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateOrCreateOAuthUser(data: { provider: string; providerId: string; email: string }) {
    // 1. Buscamos si la identidad ya existe
    let identity = await this.prisma.oauth_identities.findUnique({
      where: {
        provider_provider_id: {
          provider: data.provider,
          provider_id: data.providerId,
        },
      },
    });

    // 2. Si no existe, la creamos (Procesamiento/Manejo de Excepciones)
    if (!identity) {
      identity = await this.prisma.oauth_identities.create({
        data: {
          provider: data.provider,
          provider_id: data.providerId,
          email: data.email,
        },
      });
    }

    return identity;
  }
  async completeRegistration(dto: any, oauthId: number) {
    try {
      // Llamamos al procedure usando queryRaw
      // El procedure devuelve una tabla con new_empleado_id y status_message
      const [result] = await this.prisma.$queryRaw<any[]>`
        SELECT * FROM register_oauth_employee(
          ${oauthId},
          ${dto.nombre},
          ${dto.apellido_p},
          ${dto.apellido_m || null},
          ${dto.telefono || null},
          ${dto.email},
          ${dto.rol || 'Employee'}
        )
      `;

      // Manejo de excepciones basado en la lógica del procedure
      if (!result || !result.new_empleado_id) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: result?.status_message || 'Error al vincular el empleado',
        });
      }

      return {
        message: result.status_message,
        empleadoId: result.new_empleado_id
      };

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}