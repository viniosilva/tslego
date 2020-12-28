import { RpcException } from '@nestjs/microservices';
import { ServiceError, status } from 'grpc';
import { NotFoundException } from './exception/NotFoundException';
import { logger } from './logger';

export function errorHandler(err: Error): void {
  if (err instanceof NotFoundException) {
    throw new RpcException({
      code: status.NOT_FOUND,
      message: err.message,
    } as ServiceError);
  } else {
    logger.child({ stackError: err.stack }).error(err.message);
    throw new RpcException({
      code: status.INTERNAL,
      message: 'Internal server error',
    } as ServiceError);
  }
}
