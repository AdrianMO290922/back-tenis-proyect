import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajusta la ruta a tu proyecto

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

    return identity; // Retornamos la identidad para que el controlador decida qué hacer
  }
}