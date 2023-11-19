import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  getTasks(@Query() dto: GetTasksFilterDto): Task[] {
    if (Object.keys(dto).length) {
      return this.tasksServices.getTasksWithFilters(dto);
    }

    return this.tasksServices.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') taskId: string): Task {
    return this.tasksServices.getTaskById(taskId);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') taskId: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksServices.updateTaskStatus(taskId, status);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto): Task {
    return this.tasksServices.createTask(dto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') taskId: string): string {
    return this.tasksServices.deleteTask(taskId);
  }
}
