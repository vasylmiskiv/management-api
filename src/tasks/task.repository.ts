import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(dto: GetTasksFilterDto) {
    const { status, search } = dto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async getTaskById(id: number) {
    const task = await this.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} has not been found`);
    }

    return task;
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const { title, description } = dto;

    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }

  async deleteTask(taskId: number): Promise<number> {
    const result = await this.delete(taskId);

    if (!result.affected) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return taskId;
  }
}
