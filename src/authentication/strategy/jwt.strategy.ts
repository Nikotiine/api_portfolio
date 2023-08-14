import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthenticationService } from '../authentication.service';
import appConfig from '../../config/app.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({
      secretOrKey: appConfig().jwtSecretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: any) {
    return {
      email: payload.email,
      id: payload.sub,
      role: payload.role,
    };
  }
}
