import {
  Body,
  Controller,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/core/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() regiterDTO: { username: string; password: string; email: string },
  ) {
    return this.authService.register(
      regiterDTO.username,
      regiterDTO.password,
      regiterDTO.email,
    );
  }

  @Post('login')
  async login(
    @Body() authDto: { username: string; password: string },
    @Session() session: Record<string, any>,
  ) {
    const { token } = await this.authService.authenticate(
      authDto.username,
      authDto.password,
    );

    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }

    session.token = token;
    return { message: 'Login successful', token };
  }
}
