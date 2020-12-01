import { description, version } from '../package.json';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { AppModule } from './AppModule';
import { apiConfig } from './common/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());

  configureSwagger(app);

  await app.listen(apiConfig.port);

  const logger = app.get(Logger);
  logger.log(`App listening at [${apiConfig.host}:${apiConfig.port}]`);
}

function configureSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('TSLego Nest Hello')
    .setDescription(description)
    .setVersion(version)
    .addTag('User', 'Operations about users')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/docs', app, document);
}
bootstrap();
