import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TaskService } from '../../core/service/task.service';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Crear una nueva tarea
  @Post()
  async create(
    @Body()
    taskDTO: {
      title: string;
      description: string;
      status: TaskStatus;
      expected_date: string;
    },
  ) {
    const expectedDate = taskDTO.expected_date
      ? new Date(taskDTO.expected_date)
      : null;
    const userID = 'e4b8c165-81cc-4df4-aa22-20fe94ab57e9';
    await this.taskService.create(
      {
        title: taskDTO.title,
        description: taskDTO.description,
        status: taskDTO.status,
        expectedDate,
      },
      userID,
    );

    return {
      message: 'task created successfully',
    };
  }

  @Get()
  async findAll() {
    const userID = 'e4b8c165-81cc-4df4-aa22-20fe94ab57e9';
    return await this.taskService.getAll(userID);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const userID = 'e4b8c165-81cc-4df4-aa22-20fe94ab57e9';
    const task = await this.taskService.getByID(id, userID);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    taskDTO: {
      title?: string;
      description?: string;
      status?: TaskStatus;
      expected_date?: string;
    },
  ) {
    const userID = 'e4b8c165-81cc-4df4-aa22-20fe94ab57e9';
    const expectedDate = taskDTO.expected_date
      ? new Date(taskDTO.expected_date)
      : undefined; // Parsear la fecha si está presente
    const updatedTask = await this.taskService.update(id, userID, {
      ...taskDTO,
      expectedDate,
    });

    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updatedTask;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const userID = 'e4b8c165-81cc-4df4-aa22-20fe94ab57e9';

    await this.taskService.delete(id, userID);

    return { message: 'Task deleted successfully' };
  }
}
