import { Injectable } from '@nestjs/common';
import * as OktaJwtVerifier from '@okta/jwt-verifier';

@Injectable()
export class AuthService {
  private oktaVerifier: OktaJwtVerifier;
  private audience: string;

  constructor() {
    this.oktaVerifier = new OktaJwtVerifier({
      issuer: process.env.OKTA_ISSUER,
      clientId: process.env.OKTA_CLIENT_ID,
    });

    this.audience = 'api://default';
  }

  async validateToken(token: string): Promise<OktaJwtVerifier.Jwt> {
    return this.oktaVerifier.verifyAccessToken(token, this.audience);
  }
}
