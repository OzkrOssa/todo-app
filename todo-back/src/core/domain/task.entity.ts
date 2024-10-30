import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TypeOrmUser } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending',
  })
  status: 'pending' | 'in progress' | 'completed';

  @Column({ nullable: true })
  expectedDate: Date;

  @ManyToOne(() => TypeOrmUser, (user) => user.tasks)
  user: TypeOrmUser;
}
