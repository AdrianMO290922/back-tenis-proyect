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
    const { id, emails, username } = profile;
    
    // Objeto sanitizado para pasar al procesamiento
    const oauthUser = {
      provider: 'github',
      providerId: id,
      email: emails[0].value,
    };

    return await this.authService.validateOrCreateOAuthUser(oauthUser);
  }
}