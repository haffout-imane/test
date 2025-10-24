import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(private readonly prisma: PrismaService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => req?.cookies?.['auth_token'],
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: any) {
    console.log("JWT Payload", payload);
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    console.log("Found user", user);
    if (!user) return null;

    const { password, ...rest } = user;

    return rest;
    // this.logger.log("SALAAAAAAAAAM");
    // this.logger.log("payload", payload);
    // return { id: payload.sub, email: payload.email };
  }
}
