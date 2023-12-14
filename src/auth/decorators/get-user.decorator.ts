import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../user.entity';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): User => {
    const { user } = ctx.switchToHttp().getRequest();

    return user;
  },
);
