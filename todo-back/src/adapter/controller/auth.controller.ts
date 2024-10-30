import { Body, Controller, Post } from '@nestjs/common';
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
  async login(@Body() authDto: { username: string; password: string }) {
    return this.authService.authenticate(authDto.username, authDto.password);
  }
}
