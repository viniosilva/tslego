import { Module, Provider } from '@nestjs/common';
import { UserController } from './UserController';
import { UserService } from './UserService';

const userProvider: Provider = {
  provide: UserService,
  useFactory: () => new UserService(),
};

@Module({
  controllers: [UserController],
  providers: [userProvider],
})
export class UserModule {}
