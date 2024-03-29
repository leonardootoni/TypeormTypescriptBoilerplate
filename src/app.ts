import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import helmet from 'helmet';
import cors from 'cors';

import log4js from 'log4js';
import { serverLogger as logger } from './services/Logger';
import environment from './services/BootstrapValidator';
import Database from './database';

import appRoutes from './app/routes';

function shutdownApp(): void {
  logger.fatal('Server environment is not configured appropriately.');
  logger.fatal('System halted.');
  log4js.shutdown();
  process.exit(1);
}

/**
 * Application Bootstrap class
 * @author Leonardo Otoni
 */
class App {
  public instance: express.Application;

  private readonly backendIPPort: number = 3333;

  public constructor() {
    this.instance = express();
  }

  // Bootstrap method
  public async startup(): Promise<void> {
    logger.info('Starting Application...');

    if (!(await environment.isValid())) {
      shutdownApp();
    }

    try {
      await Database.connect();
    } catch (error) {
      logger.error(error);
      shutdownApp();
    }

    this.loadMiddlewares();
    this.instance.use(await appRoutes);
    this.defaultExceptionHandler();
    this.instance.listen(this.backendIPPort);
    logger.info(`Application Started on port ${this.backendIPPort}`);
  }

  private loadMiddlewares(): void {
    this.instance.use(cors());
    this.instance.use(helmet());
    this.instance.use(express.json());
  }

  /**
   * General Server Exception Handler.
   * WARNING: It has to be declared before all routes and all middlewares.
   */
  private defaultExceptionHandler(): void {
    this.instance.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
      logger.error('Internal Error: ', err);
      return res.status(500).json({ message: 'Internal Server error.' });
    });
  }
}

export default new App();
