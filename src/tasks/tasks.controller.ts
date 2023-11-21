import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksServices: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) dto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksServices.getTasks(dto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) taskId: number): Promise<Task> {
    return this.tasksServices.getTaskById(taskId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksServices.createTask(dto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) taskId: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksServices.updateTaskStatus(taskId, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') taskId: number): Promise<number> {
    return this.tasksServices.deleteTask(taskId);
  }
}
