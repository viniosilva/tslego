import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './AppModule';
import { apiConfig } from './common/config';
import { logger } from './common/logger';

async function bootstrap() {
  const url = `${apiConfig.host}:${apiConfig.port}`;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      logger: false,
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: 'protos/user.proto',
        url,
      },
    },
  );

  app.listen(() => logger.info(`App listening at [${url}]`));
}

bootstrap();
