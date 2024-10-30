import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(username: string, password: string, email: string) {
    const user = await this.userService.findOne(username);

    if (user) {
      throw new BadRequestException('user already exists');
    }

    await this.userService.create(username, password, email);

    return {
      message: 'User created successfully',
    };
  }

  async authenticate(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('invalid username');
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      token: accessToken,
      email: user.email,
    };
  }
}
