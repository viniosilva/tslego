import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggerModule } from 'nestjs-pino';
import { httpLogger } from './common/httpLogger';
import { UserModule } from './user/UserModule';

@Module({
  imports: [
    LoggerModule.forRoot({ pinoHttp: httpLogger }),
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      sortSchema: true,
    }),
  ],
})
export class AppModule {}
