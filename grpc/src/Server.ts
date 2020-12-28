import { Server as GrpcServer, ServerCredentials } from 'grpc';
import { Logger } from 'pino';
import { IHandler } from './IHandler';

export class Server {
  private readonly server = new GrpcServer();

  constructor(
    private readonly host: string,
    private readonly port: number,
    handlers: IHandler[],
    private readonly logger: Logger,
  ) {
    handlers.forEach((handler: IHandler) => {
      this.server.addService(handler.proto.service, handler.services);
    });
  }

  start() {
    const url = `${this.host}:${this.port}`;
    this.server.bind(url, ServerCredentials.createInsecure());
    this.server.start();

    this.logger.info(`App listening on [${url}]`);
  }
}
