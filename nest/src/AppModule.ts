import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { httpLogger } from './common/httpLogger';
import { UserModule } from './user/UserModule';

@Module({
  imports: [LoggerModule.forRoot({ pinoHttp: httpLogger }), UserModule],
})
export class AppModule {}
