import { logger } from '../../services/Logger';
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
    async index(req, res) {
        const users = await UserModel.listUsers(req.limit, req.offset);
        return res.json(users);
    }
    /**
     * Create new User Controller Route
     * @param req
     * @param res
     */
    async store(req, res) {
        const id = await UserModel.createNewUser(Object.assign({}, req.body));
        return res.json({ message: 'ok', user: { id } });
    }
    /**
     * Update a existing User
     * @param req
     * @param res
     */
    async update(req, res) {
        const userData = Object.assign({}, req.body);
        const { id } = req.params;
        await UserModel.updateUser(parseInt(id, 10), userData);
        return res.json({ message: 'ok.' });
    }
    /**
     * Delete a user
     * @param req
     * @param res
     */
    async delete(req, res) {
        logger.debug(`[Delete] /users - Controller - UserId: ${req.params.id}`);
        const { id } = req.params;
        UserModel.deleteUser(parseInt(id, 10));
        return res.json({ message: 'ok' });
    }
}
export default new UserController();
//# sourceMappingURL=UserController.js.map