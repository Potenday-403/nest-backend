import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUserId = createParamDecorator(
  (data, ctx: ExecutionContext): number => {
    const req = ctx.switchToHttp().getRequest();

    return Number(req.user.id);
  },
);
