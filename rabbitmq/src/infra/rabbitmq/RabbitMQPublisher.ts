import { Options } from 'amqplib';
import { Logger } from 'pino';
import { RabbitMQ } from './RabbitMQ';

export class RabbitMQPublisher extends RabbitMQ {
  constructor(config: Options.Connect, queueName: string, logger: Logger) {
    super(config, queueName, logger);
  }

  publish(message: string): void {
    this.channel.sendToQueue(this.queueName, Buffer.from(message));
    this.logger.child({ message }).info('RabbitMQ: message published');
  }
}
