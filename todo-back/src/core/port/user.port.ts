import { TypeOrmUser } from '../domain/user.entity';

export const USER_PORT = Symbol('UserPort');

export interface UserPort {
  save(user: TypeOrmUser): Promise<void>;
  findOne(username: string): Promise<TypeOrmUser | null>;
}
