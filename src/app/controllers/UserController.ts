import { Request, Response } from 'express';
import { UserData } from '../interfaces/User';
import UserModel from '../models/UserModel';

/**
 * Controller Class to manage all the application login users.
 * @author: Leonardo Otoni
 */
class UserController {
  /**
   * List Users Route
   * @param req
   * @param res
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const data: object = await UserModel.listUsers(req.limit, req.offset);
    return res.json(data);
  }

  /**
   * Create new User
   * @param req
   * @param res
   */
  public async store(req: Request, res: Response): Promise<Response> {
    const id: number = await UserModel.createNewUser({ ...(req.body as UserData) });
    return res.json({ user: { id } });
  }

  /**
   * Update a existing User
   * @param req
   * @param res
   */
  public async update(req: Request, res: Response): Promise<Response> {
    const userData = { ...(req.body as UserData) };
    const { id } = req.params;
    await UserModel.updateUser(parseInt(id, 10), userData);
    return res.json({ message: 'ok.' });
  }

  /**
   * Delete a user
   * @param req
   * @param res
   */
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    UserModel.deleteUser(parseInt(id, 10));
    return res.json({ message: 'ok' });
  }
}

export default new UserController();
