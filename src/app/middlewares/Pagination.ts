import { Request, Response, NextFunction } from 'express';

/**
 * Default Pagination Middleware
 * @author Leonardo Otoni
 */
export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const reqPage = Number.parseInt(req.query.page, 10);
  const reqLimit = Number.parseInt(req.query.limit, 10);

  const serverPage = reqPage || 1;
  const serverLimit = reqLimit && reqLimit === 20 ? reqLimit : 10;

  req.offset = (serverPage - 1) * serverLimit;
  req.limit = serverLimit;
  return next();
};
