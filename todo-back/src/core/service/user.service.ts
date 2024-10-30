import { Injectable, Inject } from '@nestjs/common';
import { TypeOrmUser } from '../domain/user.entity';
import { UserPort, USER_PORT } from '../port/user.port';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject(USER_PORT) private readonly userPort: UserPort) {}

  async create(
    username: string,
    password: string,
    email: string,
  ): Promise<TypeOrmUser> {
    const passwordHash = await this.hashPassword(password);
    const user = new TypeOrmUser();
    user.username = username;
    user.passwordHash = passwordHash;
    user.email = email;

    await this.userPort.save(user);
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
