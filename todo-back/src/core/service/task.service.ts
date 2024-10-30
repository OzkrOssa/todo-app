import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '../domain/task.entity';
import { TASK_PORT, TaskPort } from '../port/task.port';

@Injectable()
export class TaskService {
  constructor(@Inject(TASK_PORT) private readonly taskPort: TaskPort) {}

  async create(task: Partial<Task>, userID: string): Promise<void> {
    await this.taskPort.create(task, userID);
  }

  async update(id: string, userID: string, task: Partial<Task>): Promise<Task> {
    if (!task.title || task.title.trim().length === 0) {
      throw new BadRequestException('title is required');
    }

    const validStates = ['pending', 'in progress', 'completed'];
    if (!validStates.includes(task.status)) {
      throw new BadRequestException(
        `must contain a state: ${validStates.join(', ')}`,
      );
    }

    if (task.expectedDate && task.expectedDate < new Date()) {
      throw new BadRequestException('The expected date must be in the future.');
    }
    return await this.taskPort.update(id, userID, task);
  }

  async getAll(userID: string): Promise<Task[]> {
    const tasks = this.taskPort.getAll(userID);

    return tasks;
  }

  async getByID(id: string, userID: string): Promise<Task | null> {
    return await this.taskPort.getByID(id, userID);
  }

  async delete(id: string, userID: string): Promise<void> {
    return await this.taskPort.delete(id, userID);
  }
}
