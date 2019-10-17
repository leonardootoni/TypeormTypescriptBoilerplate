import { Router } from 'express';
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
    constructor() {
        this.routes = Router();
    }
    async getRoutes() {
        await this.registerUnprotectedRoutes();
        await this.registerRouterMiddlewares();
        await this.registerProtectedRoutes();
        await this.registerFinalMiddlewares();
        return this.routes;
    }
    async registerUnprotectedRoutes() {
        this.routes.post('/session', SessionValidator.store, SessionController.store);
        this.routes.post('/users', UserValidator.store, UserController.store);
    }
    async registerRouterMiddlewares() {
        this.routes.use(Security.checkCredentials);
        this.routes.use(Pagination);
    }
    async registerProtectedRoutes() {
        this.routes.get('/users', UserController.index);
        this.routes.post('/users', UserValidator.store, UserController.store);
        this.routes.put('/users/:id', UserValidator.update, UserController.update);
        this.routes.delete('/users/:id', UserValidator.delete, UserController.delete);
    }
    async registerFinalMiddlewares() {
        /**
         * Default 404 Route
         */
        this.routes.use(async (req, res) => {
            res.status(404).send({ message: 'Route Not Found.' });
        });
    }
}
export default new ApplicationRoutes();
// export default routes;
// const routes: Router = Router();
/**
 * Unprotected routes
 */
/**
 * Application Middlewares
 */
/**
 * Protected routes
 */
// routes.get('/users', UserController.index);
// routes.post('/users', UserValidator.store, UserController.store);
// routes.put('/users/:id', UserValidator.update, UserController.update);
// routes.delete('/users/:id', UserValidator.delete, UserController.delete);
// /**
//  * Default 404 Route
//  */
// routes.use(async (req: Request, res: Response) => {
//   res.status(404).send({ message: 'Route Not Found.' });
// });
// return routes;
//# sourceMappingURL=index.js.map