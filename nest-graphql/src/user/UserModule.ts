import { Module, Provider } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';

const userProvider: Provider = {
  provide: UserService,
  useFactory: () => new UserService(),
};

@Module({
  providers: [UserResolver, userProvider],
})
export class UserModule {}
