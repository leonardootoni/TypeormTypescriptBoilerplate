import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import log4js from 'log4js';
import { serverLogger as logger } from './config/Logger';
import environment from './config/Environment';

import routes from './routes';

function shutdownApp(): void {
  logger.fatal('Server environment is not configured appropriately.');
  logger.fatal('System halted.');
  log4js.shutdown();
  process.exit(1);
}

class App {
  public instance: express.Application;

  public constructor() {
    this.instance = express();
    this.loadApp();
  }

  private async loadApp(): Promise<void> {
    logger.info('Starting Application...');

    if (!(await environment.isValid())) {
      shutdownApp();
    }

    this.loadMiddlewares();
    this.instance.use(routes);
    logger.info('Application Started');
  }

  private loadMiddlewares(): void {
    this.instance.use(cors());
    this.instance.use(helmet());
    this.instance.use(express.json());
  }
}


export default new App();
