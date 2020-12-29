import { ConsumeMessage } from 'amqplib';
import { rabbitMqConfig } from './common/config';
import { logger } from './common/logger';
import { RabbitMQConsumer } from './infra/rabbitmq/RabbitMQConsumer';

const rabbitMQ = new RabbitMQConsumer(
  {
    hostname: rabbitMqConfig.host,
    port: rabbitMqConfig.port,
    username: rabbitMqConfig.user,
    password: rabbitMqConfig.password,
  },
  'hello',
  logger,
);

async function bootstrap() {
  await rabbitMQ.start();
  rabbitMQ.consume((message: ConsumeMessage) => {
    logger
      .child({ message: message.content.toString() })
      .info('RabbitMQ: message consumed');
  });
}
bootstrap();
