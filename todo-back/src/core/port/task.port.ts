import { Task } from '../domain/task.entity';

export const TASK_PORT = Symbol('TaskPort');

export interface TaskPort {
  create(task: Partial<Task>, userID: string): Promise<void>;
  update(id: string, userID: string, task: Partial<Task>): Promise<Task>;
  getAll(userID: string): Promise<Task[]>;
  getByID(id: string, userID: string): Promise<Task | null>;
  delete(id: string, userID: string): Promise<void>;
}
