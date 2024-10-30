import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/core/domain/task.entity';
import { TypeOrmUser } from 'src/core/domain/user.entity';
import { TaskPort } from 'src/core/port/task.port';
import { Repository } from 'typeorm';

@Injectable()
export class TaskRepository implements TaskPort {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(task: Task, userID: string): Promise<void> {
    if (!task.user) {
      task.user = new TypeOrmUser();
    }
    task.user.id = userID;
    const newTask = this.taskRepository.create(task);
    await this.taskRepository.save(newTask);
  }

  async update(id: string, userID: string, task: Partial<Task>): Promise<Task> {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!existingTask) {
      throw new Error('Task not found');
    }

    if (existingTask.user.id !== userID) {
      throw new Error('You are not authorized to update this task');
    }

    existingTask.title = task.title;
    existingTask.description = task.description;
    existingTask.status = task.status;
    existingTask.expectedDate = task.expectedDate;

    const updatedTask = await this.taskRepository.save(existingTask);
    return updatedTask;
  }

  async getAll(userID: string): Promise<Task[]> {
    const task = await this.taskRepository.find({
      where: { user: { id: userID } },
    });
    return task;
  }

  async getByID(id: string, userID: string): Promise<Task | null> {
    const task = this.taskRepository.findOne({
      where: { id: id, user: { id: userID } },
    });
    return task;
  }
  async delete(id: string, userID: string): Promise<void> {
    const existingTask = await this.taskRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!existingTask) {
      throw new NotFoundException('Task not found');
    }

    if (existingTask.user.id !== userID) {
      throw new UnauthorizedException(
        'You are not authorized to delete this task',
      );
    }

    const deleteResult = await this.taskRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException('Task not found or already deleted');
    }
  }
}
