import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function ControllerDecorator(name: string) {
  return applyDecorators(Controller(name), ApiTags(name));
}
