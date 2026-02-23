import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.CLIENTE_GOOGLE_ID || '',
      clientSecret: process.env.CLIENTE_GOOGLE_SECRET || '',
      callbackURL: process.env.CLIENTE_GOOGLE_CALLBACK_URL || '',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, emails, name } = profile;

    const oauthUser = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      nombre: name?.givenName || null,
      apellido_p: name?.familyName || null,
    };

    const user = await this.authService.validateOrCreateOAuthUser(oauthUser);
    done(null, user);
  }
}