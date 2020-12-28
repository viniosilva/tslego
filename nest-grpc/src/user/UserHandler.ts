import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from 'grpc';
import { Response } from 'src/dto/Response';
import { User, UserRequest, UserRequestId } from './dto/User';
import { UserService } from './UserService';

@Controller()
export class UserHandler {
  constructor(
    private readonly userService: UserService,
    @Inject('ErrorHandler') private readonly errorHandler: Function,
  ) {}

  @GrpcMethod('UserService', 'getUsers')
  getUsers(
    _data: any,
    _metadata: Metadata,
    _call: ServerUnaryCall<Response>,
  ): Response {
    try {
      const users = this.userService.getUsers();
      return { data: users };
    } catch (err) {
      this.errorHandler(err);
    }
  }

  @GrpcMethod('UserService', 'getUserById')
  getUserById(
    data: UserRequestId,
    _metadata: Metadata,
    _call: ServerUnaryCall<Response>,
  ): Response {
    try {
      this.userService.validateUserRequestId(data);

      const user = this.userService.getUserById(data.id);
      return { data: user };
    } catch (err) {
      this.errorHandler(err);
    }
  }

  @GrpcMethod('UserService', 'createUser')
  createUser(
    data: UserRequest,
    _metadata: Metadata,
    _call: ServerUnaryCall<Response>,
  ): Response {
    try {
      this.userService.validateUserRequest(data);

      const user = this.userService.createUser(data);
      return { data: user };
    } catch (err) {
      this.errorHandler(err);
    }
  }

  @GrpcMethod('UserService', 'updateUserById')
  updateUserById(
    data: User,
    _metadata: Metadata,
    _call: ServerUnaryCall<Response>,
  ): Response {
    try {
      this.userService.validateUser(data);

      const user = this.userService.updateUserById(data.id, data);
      return { data: user };
    } catch (err) {
      this.errorHandler(err);
    }
  }

  @GrpcMethod('UserService', 'removeUserById')
  removeUserById(
    data: UserRequestId,
    _metadata: Metadata,
    _call: ServerUnaryCall<Response>,
  ): Response {
    try {
      this.userService.validateUserRequestId(data);

      this.userService.removeUserById(data.id);
      return { message: 'OK' };
    } catch (err) {
      this.errorHandler(err);
    }
  }
}
