import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmUser } from '../../core/domain/user.entity';
import { UserPort } from '../../core/port/user.port';

@Injectable()
export class UserRepository implements UserPort {
  constructor(
    @InjectRepository(TypeOrmUser)
    private readonly userRepository: Repository<TypeOrmUser>,
  ) {}
  findOne(username: string): Promise<TypeOrmUser | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async save(user: TypeOrmUser): Promise<void> {
    await this.userRepository.save(user);
  }
}
