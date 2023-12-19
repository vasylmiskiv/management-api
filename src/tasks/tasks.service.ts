import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getTasks(dto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(dto, user);
  }

  async getTaskById(id: number, user?: User): Promise<Task> {
    const task = await this.taskRepository.getTaskById(id, user);

    return task;
  }

  async updateTaskStatus(
    taskId: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(taskId, user);

    task.status = status;
    task.save();

    return task;
  }

  createTask(dto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(dto, user);
  }

  deleteTask(taskId: number, user: User): Promise<number> {
    return this.taskRepository.deleteTask(taskId, user);
  }
}
