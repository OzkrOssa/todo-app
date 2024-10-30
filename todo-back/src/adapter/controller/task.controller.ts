import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Get,
  Param,
  Put,
  Delete,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { TaskService } from '../../core/service/task.service';
import { JwtService } from '@nestjs/jwt';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Body()
    taskDTO: {
      title: string;
      description: string;
      status: TaskStatus;
      expected_date: string;
    },
    @Headers('authorization') authorization: string,
  ) {
    const expectedDate = taskDTO.expected_date
      ? new Date(taskDTO.expected_date)
      : null;
    if (!authorization) {
      throw new UnauthorizedException('You must be logged ');
    }

    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token, {
      secret: 'todoapp',
    });

    await this.taskService.create(
      {
        title: taskDTO.title,
        description: taskDTO.description,
        status: taskDTO.status,
        expectedDate,
      },
      decoded.id,
    );

    return {
      message: 'task created successfully',
    };
  }

  @Get()
  async findAll(@Headers('authorization') authorization: string) {
    if (!authorization) {
      throw new UnauthorizedException('You must be logged ');
    }
    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token, {
      secret: 'todoapp',
    });

    return await this.taskService.getAll(decoded.id);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    if (!authorization) {
      throw new UnauthorizedException('You must be logged ');
    }

    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token, {
      secret: 'todoapp',
    });
    const task = await this.taskService.getByID(id, decoded.id);
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
    @Headers('authorization') authorization: string,
  ) {
    if (!authorization) {
      throw new UnauthorizedException('You must be logged ');
    }
    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token, {
      secret: 'todoapp',
    });
    const expectedDate = taskDTO.expected_date
      ? new Date(taskDTO.expected_date)
      : undefined; // Parsear la fecha si está presente
    const updatedTask = await this.taskService.update(id, decoded.id, {
      ...taskDTO,
      expectedDate,
    });

    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updatedTask;
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ): Promise<{ message: string }> {
    if (!authorization) {
      throw new UnauthorizedException('You must be logged ');
    }
    const token = authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token, {
      secret: 'todoapp',
    });

    await this.taskService.delete(id, decoded.id);

    return { message: 'Task deleted successfully' };
  }
}
