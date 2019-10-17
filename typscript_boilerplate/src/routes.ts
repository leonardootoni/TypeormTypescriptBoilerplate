import { Router, Request, Response } from 'express';

class Routes {
    public routes: Router;

    constructor() {
      this.routes = Router();
      this.loadRoutes();
    }

    private loadRoutes(): void {
      this.routes.get('/', (req: Request, res: Response): Response => res.json({ message: 'Hello World' }));
    }
}

export default new Routes().routes;
