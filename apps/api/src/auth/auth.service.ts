import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignUpDto) {
    try {
      const { email, firstName, lastName, password } = dto;
      const hash = await argon.hash(password);
      const user = await this.prisma.user.create({
        data: {
          email,
          hash,
          firstName,
          lastName,
        },
      });
      const token = await this.signToken(user.id, user.email);

      return {
        token,
        email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException(
          'Email already registered. Please choose a different email.',
        );
      }

      throw error;
    }
  }
  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    const token = await this.signToken(user.id, user.email);
    const passwordMatchs = argon.verify(user.hash, password);

    if (!user || !passwordMatchs) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return {
      token,
      email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return token;
  }
}
