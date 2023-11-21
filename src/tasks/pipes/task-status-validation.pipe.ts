import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  private isStatusValid(status: any) {
    status = status.toUpperCase();

    const isExists = this.allowedStatuses.includes(status);

    return isExists;
  }

  transform(value: any) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }
}
