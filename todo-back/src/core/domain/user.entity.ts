import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class TypeOrmUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.passwordHash);
  }
}
