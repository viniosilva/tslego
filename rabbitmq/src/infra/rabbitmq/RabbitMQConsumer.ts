import { ConsumeMessage, Options } from 'amqplib';
import { Logger } from 'pino';
import { RabbitMQ } from './RabbitMQ';

export class RabbitMQConsumer extends RabbitMQ {
  constructor(config: Options.Connect, queueName: string, logger: Logger) {
    super(config, queueName, logger);
  }

  consume(callback: (msg: ConsumeMessage) => void): void {
    this.channel.consume(this.queueName, callback);
    this.logger
      .child({ queueName: this.queueName })
      .info('RabbitMQ: consuming messages');
  }
}
