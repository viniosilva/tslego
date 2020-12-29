import { rabbitMqConfig } from './common/config';
import { logger } from './common/logger';
import { RabbitMQPublisher } from './infra/rabbitmq/RabbitMQPublisher';
import { Readline } from './infra/readline/Readline';

const rabbitMQ = new RabbitMQPublisher(
  {
    hostname: rabbitMqConfig.host,
    port: rabbitMqConfig.port,
    username: rabbitMqConfig.user,
    password: rabbitMqConfig.password,
  },
  'hello',
  logger,
);

const readline = new Readline();

async function bootstrap() {
  await rabbitMQ.start();

  let answer = await readline.question('Message:');

  while (answer.toUpperCase() !== 'EXIT') {
    rabbitMQ.publish(answer);
    answer = await readline.question('Message:');
  }
  readline.close();
  rabbitMQ.end();
}
bootstrap();
