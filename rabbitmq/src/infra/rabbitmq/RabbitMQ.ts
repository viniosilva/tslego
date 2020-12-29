import { Channel, connect, Connection, Options } from 'amqplib';
import { Logger } from 'pino';

export class RabbitMQ {
  protected connection: Connection;
  protected channel: Channel;

  constructor(
    private readonly config: Options.Connect,
    protected readonly queueName: string,
    protected readonly logger: Logger,
  ) {}

  async start(): Promise<void> {
    this.connection = await connect(this.config);
    this.channel = await this.connection.createChannel();
    this.channel.assertQueue(this.queueName, { durable: false });

    this.logger.child({ queueName: this.queueName }).info('RabbitMQ: start');
  }

  async end(): Promise<void> {
    await this.connection.close();
    this.logger.child({ queueName: this.queueName }).info('RabbitMQ: end');
  }
}
