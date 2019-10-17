import { Router, Request, Response } from 'express';

import Security from '../middlewares/Security';
import Pagination from '../middlewares/Pagination';

import SessionValidator from '../middlewares/validators/SessionValidator';
import SessionController from '../controllers/SessionController';

import UserValidator from '../middlewares/validators/UserValidator';
import UserController from '../controllers/UserController';
/**
 * Application Routes Declaration
 * @author Leonardo Otoni
 */
class ApplicationRoutes {
  private routes: Router;

  constructor() {
    this.routes = Router();
  }

  public async getRoutes(): Promise<Router> {
    await this.registerUnprotectedRoutes();
    await this.registerRouterMiddlewares();
    await this.registerProtectedRoutes();
    await this.registerFinalMiddlewares();
    return this.routes;
  }

  private async registerUnprotectedRoutes(): Promise<void> {
    this.routes.post('/session', SessionValidator.store, SessionController.store);
    this.routes.post('/users', UserValidator.store, UserController.store);
  }

  private async registerRouterMiddlewares(): Promise<void> {
    this.routes.use(Security.checkCredentials);
    this.routes.use(Pagination);
  }

  private async registerProtectedRoutes(): Promise<void> {
    this.routes.get('/users', UserController.index);
    this.routes.post('/users', UserValidator.store, UserController.store);
    this.routes.put('/users/:id', UserValidator.update, UserController.update);
    this.routes.delete('/users/:id', UserValidator.delete, UserController.delete);
  }

  private async registerFinalMiddlewares(): Promise<void> {
    /**
     * Default 404 Route
     */
    this.routes.use(async (req: Request, res: Response) => {
      res.status(404).send({ message: 'Route Not Found.' });
    });
  }
}

export default new ApplicationRoutes().getRoutes();
