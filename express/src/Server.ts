import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import helmet from 'helmet';
import { Logger } from 'pino';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';
import { httpLogger } from './common/httpLogger';
import { HttpStatus } from './common/HttpStatus';

export class Server {
  readonly app = express();
  constructor(
    private readonly host: string,
    private readonly port: number,
    private readonly logger: Logger,
    swaggerConfig: SwaggerOptions,
    routes: RequestHandler[],
  ) {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(httpLogger);
    this.configureSwagger(swaggerConfig);

    routes.forEach((route) => this.app.use('/api', route));

    this.app.use(this.errorHandler.bind(this));
  }

  private configureSwagger(config: SwaggerOptions) {
    if (JSON.stringify(config) !== '{}') {
      this.app.use(
        '/api/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerJSDoc(config)),
      );
    }
  }

  private errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    this.logger.child({ errorStack: err.stack }).error(err.message);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal server error!');
  }

  start() {
    this.app.listen(this.port, () => {
      this.logger.info(`App listening at [${this.host}:${this.port}]`);
    });
  }
}
