import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';
import log4js from 'log4js';
import { serverLogger as logger } from './services/Logger';
import environment from './services/BootstrapValidator';
import Database from './database';
import ApplicationRoutes from './app/routes';
function shutdownApp() {
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
    constructor() {
        this.backendIPPort = 3333;
        this.instance = express();
    }
    // Bootstrap method
    async startup() {
        logger.info('Starting Application...');
        if (!(await environment.isValid())) {
            shutdownApp();
        }
        try {
            await Database.connect();
        }
        catch (error) {
            logger.error(error);
            shutdownApp();
        }
        this.loadMiddlewares();
        this.instance.use(await ApplicationRoutes.getRoutes());
        this.instance.listen(this.backendIPPort);
        logger.info(`Application Started on port ${this.backendIPPort}`);
    }
    loadMiddlewares() {
        this.instance.use(cors());
        this.instance.use(helmet());
        this.instance.use(express.json());
        this.defaultExceptionHandler();
    }
    defaultExceptionHandler() {
        // TODO Verifiy method signature
        this.instance.use((err, req, res, next) => {
            logger.error('Unhandled Server Exception', [err]);
            return res.status(500).json({ message: 'Internal Server error.' });
        });
    }
}
export default new App();
//# sourceMappingURL=app.js.map