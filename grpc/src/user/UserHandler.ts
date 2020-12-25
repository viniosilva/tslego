import { loadSync } from '@grpc/proto-loader';
import {
  loadPackageDefinition,
  sendUnaryData,
  ServerUnaryCall,
  ServiceError,
  status,
} from 'grpc';
import { Logger } from 'pino';
import { Response } from '../dto/Response';
import { IHandler } from '../IHandler';
import { User, UserRequest, UserRequestId } from './dto/User';
import { NotFoundException } from './exception/NotFoundException';
import { UserService } from './UserService';

export class UserHandler implements IHandler {
  readonly proto: any;
  readonly services: any;

  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {
    const packageDefinition = loadSync('protos/user.proto');
    const proto: any = loadPackageDefinition(packageDefinition).user;
    this.proto = proto.UserService;

    this.services = {
      getUsers: this.getUsers.bind(this),
      getUserById: this.getUserById.bind(this),
      createUser: this.createUser.bind(this),
      updateUserById: this.updateUserById.bind(this),
      removeUserById: this.removeUserById.bind(this),
    };
  }

  getUsers(
    call: ServerUnaryCall<null>,
    callback: sendUnaryData<Response>,
  ): void {
    try {
      this.logRequest(call.request, 'getUsers');
      callback(null, { data: this.userService.getUsers() });
    } catch (err) {
      this.errorHandler(err, callback);
    }
  }

  getUserById(
    call: ServerUnaryCall<UserRequestId>,
    callback: sendUnaryData<Response>,
  ): void {
    try {
      this.logRequest(call.request, 'getUserById');
      callback(null, {
        data: this.userService.getUserById(call.request.id),
      });
    } catch (err) {
      this.errorHandler(err, callback);
    }
  }

  createUser(
    call: ServerUnaryCall<UserRequest>,
    callback: sendUnaryData<Response>,
  ): void {
    try {
      this.logRequest(call.request, 'createUser');
      callback(null, {
        data: this.userService.createUser(call.request),
      });
    } catch (err) {
      this.errorHandler(err, callback);
    }
  }

  updateUserById(
    call: ServerUnaryCall<User>,
    callback: sendUnaryData<Response>,
  ): void {
    try {
      this.logRequest(call.request, 'updateUserById');
      callback(null, {
        data: this.userService.updateUserById(call.request.id, call.request),
      });
    } catch (err) {
      this.errorHandler(err, callback);
    }
  }

  removeUserById(
    call: ServerUnaryCall<UserRequestId>,
    callback: sendUnaryData<Response>,
  ): void {
    try {
      this.logRequest(call.request, 'removeUserById');
      this.userService.removeUserById(call.request.id);
      callback(null, { message: 'OK' });
    } catch (err) {
      this.errorHandler(err, callback);
    }
  }

  private logRequest(request: any, service: string): void {
    this.logger.child({ service, request }).info('Request completed');
  }

  private errorHandler(err: Error, callback: sendUnaryData<Response>) {
    if (err instanceof NotFoundException) {
      callback(
        { code: status.NOT_FOUND, message: err.message } as ServiceError,
        null,
      );
    } else {
      this.logger.child({ stackError: err.stack }).error(err.message);
      callback(
        {
          code: status.INTERNAL,
          message: 'Internal server error',
        } as ServiceError,
        null,
      );
    }
  }
}
