import { Module } from '@nestjs/common';
import { TaskController } from './controller/task.controller';
import { TaskService } from 'src/core/service/task.service';
import { TASK_PORT } from 'src/core/port/task.port';
import { TaskRepository } from './repository/task.repository';
import { Task } from 'src/core/domain/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TaskController],
  providers: [
    TaskService,
    JwtService,
    {
      provide: TASK_PORT,
      useClass: TaskRepository,
    },
  ],
  exports: [TASK_PORT, TaskService],
})
export class TaskModule {}
