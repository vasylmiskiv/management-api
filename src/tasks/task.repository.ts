import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './task.entity';
import { Repository, DataSource } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('taskRepository');

  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(dto: GetTasksFilterDto, user: User) {
    const { status, search } = dto;

    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}` },
      );
    }

    try {
      const tasks = await query.getMany();

      return tasks;
    } catch (err) {
      this.logger.error(
        `Failed to get tasks for user ${JSON.stringify(dto)}`,
        err.stack,
      );

      throw new InternalServerErrorException();
    }
  }

  async getTaskById(id: number, user: User) {
    const task = await this.findOne({ where: { id, userId: user.id } });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} has not been found`);
    }

    return task;
  }

  async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = dto;

    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    task.user = user;

    try {
      await task.save();
    } catch (err) {
      this.logger.error(
        `Failed to create a task for user ${user.username}. Data: ${dto}`,
        err.stack,
      );

      throw new InternalServerErrorException();
    }

    delete task.user;

    return task;
  }

  async deleteTask(taskId: number, user: User): Promise<number> {
    await this.getTaskById(taskId, user);

    const result = await this.delete(taskId);

    if (!result.affected) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return taskId;
  }
}
