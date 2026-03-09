import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from './auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.CLIENTE_GITHUB_ID ?? '',
      clientSecret: process.env.CLIENTE_GITHUB_SECRET ?? '',
      callbackURL: process.env.CLIENTE_GITHUB_CALLBACK_URL ?? '',
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, emails, displayName } = profile;

    let nombre: string | null = null;
    let apellido_p: string | null = null;

    if (displayName) {
      const parts = displayName.trim().split(/\s+/);
      nombre = parts[0] || null;
      apellido_p = parts.length > 1 ? parts.slice(1).join(' ') : null;
    }

    const oauthUser = {
      provider: 'github',
      providerId: id,
      email: emails[0].value,
      nombre,
      apellido_p,
    };

    return await this.authService.validateOrCreateOAuthUser(oauthUser);
  }
}