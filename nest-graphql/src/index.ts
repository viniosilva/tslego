import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './AppModule';
import { apiConfig } from './common/config';
import { logger } from './common/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  try {
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
  } catch (err) {
    logger.error(err);
  }
  // app.use(helmet());

  await app.listen(apiConfig.port);

  logger.info(`App listening at [${apiConfig.host}:${apiConfig.port}]`);
}
bootstrap();
