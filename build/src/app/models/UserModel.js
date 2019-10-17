import { getConnection } from 'typeorm';
import bcrypt from 'bcryptjs';
import UserRepository from '../repository/UserRepository';
import User from '../entity/User';
import { logger } from '../../services/Logger';
/**
 * Session Business Model
 * @author Leonardo Otoni
 */
class UserModel {
    /**
     * Return a paginated list of users
     * @param limit - The max number of records
     * @param offset - The amount of records to skip
     */
    async listUsers(limit, offset) {
        const userRepository = getConnection().getCustomRepository(UserRepository);
        return userRepository.listUsers(limit, offset);
    }
    /**
     * Create a new user object with a encrypted password.
     * A new user is always created having blocked status = false
     * @param userData
     */
    async createNewUser(userData) {
        const userRepository = getConnection().getCustomRepository(UserRepository);
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.blocked = false;
        try {
            user.hash = await bcrypt.hash(userData.password || '', 8);
            await userRepository.save(user);
            logger.debug(`User ${user.email} sucessfully created`);
        }
        catch (error) {
            logger.error(error);
            throw error;
        }
        return user.id;
    }
    /**
     * Update a existing user
     * @param id - User Id
     * @param userData - User data to update
     */
    async updateUser(id, userData) {
        const userRepository = getConnection().getCustomRepository(UserRepository);
        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.blocked = userData.blocked;
        logger.debug(`Will update user:`, [user]);
        await userRepository.update(id, user);
        logger.debug(`User successfully updated.`);
    }
    /**
     * Delete a user
     * @param id User id to be deleted
     */
    async deleteUser(id) {
        const userRepository = getConnection().getCustomRepository(UserRepository);
        await userRepository.delete(id);
    }
}
export default new UserModel();
//# sourceMappingURL=UserModel.js.map