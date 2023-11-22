import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  async getTasks(dto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(dto);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.getTaskById(id);

    return task;
  }

  async updateTaskStatus(taskId: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(taskId);

    task.status = status;
    task.save();

    return task;
  }

  createTask(dto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(dto);
  }

  deleteTask(taskId: number): Promise<number> {
    return this.taskRepository.deleteTask(taskId);
  }
}
