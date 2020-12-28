import { Module, Provider } from '@nestjs/common';
import { errorHandler } from '../common/errorHandler';
import { UserHandler } from './UserHandler';
import { UserService } from './UserService';

const userProvider: Provider = {
  provide: UserService,
  useFactory: () => new UserService(),
};

const errorHandlerProvider: Provider = {
  provide: 'ErrorHandler',
  useValue: errorHandler
};

@Module({
  controllers: [UserHandler],
  providers: [userProvider, errorHandlerProvider],
})
export class UserModule {}
