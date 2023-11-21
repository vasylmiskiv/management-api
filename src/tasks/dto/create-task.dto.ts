import { IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  status: TaskStatus;
}
