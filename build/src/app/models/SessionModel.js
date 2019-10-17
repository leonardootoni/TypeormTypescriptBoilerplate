import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../entity/User';
import { logger } from '../../services/Logger';
import UserRepository from '../repository/UserRepository';
import TokenConfig from '../../config/AuthConfig';
/**
 * Session Business Model
 * @author Leonardo Otoni
 */
export default class SessionModel {
    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }
    /**
     * Authenticate a user against a database record. It will throw an error whether a user is not
     * found or password is not valid.
     * @param userLogin - User email and password credentials
     */
    async signUp(userLogin) {
        const { email, password } = userLogin;
        const user = await this.userRepository.getUserLoginData(email);
        if (!user) {
            logger.debug(`Signup refused: User ${email} does not exist.`);
            throw new Error('User does not exists');
        }
        if (!(await bcrypt.compare(password, user.hash))) {
            logger.debug(`Signup refused: Invalid password for user ${email}`);
            this.computeInvalidLoginAttempt(user);
            throw new Error('Invalid Password');
        }
        if (user.attempts) {
            this.clearPastInvalidAttempts(user.id);
        }
        try {
            const { id } = user;
            // TODO: Change jwt.sigin() to async
            user.token = jwt.sign({ id }, TokenConfig.secret, { expiresIn: TokenConfig.expiresIn });
            return user;
        }
        catch (error) {
            logger.error(`Failed to generate JWT Token to user ${email}`);
            logger.error(error);
            throw error;
        }
    }
    /**
     * Register an invalid login attempt. More then 4 attempts will block a user for future logins.
     * @param user - User object with id, email and attempts data.
     */
    async computeInvalidLoginAttempt(userData) {
        logger.debug('Invalid login attempt');
        const { id } = userData;
        const attempts = userData.attempts + 1;
        const blocked = attempts > 4;
        const lastLoginAttempt = new Date();
        this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({ attempts, blocked, lastLoginAttempt })
            .where('id= :id', { id })
            .execute();
    }
    /**
     * Clear previous login attempts and lasLoginAttempt
     * @param userId.
     */
    async clearPastInvalidAttempts(userId) {
        this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({ attempts: 0, lastLoginAttempt: null })
            .where('id= :id', { id: userId })
            .execute();
    }
}
//# sourceMappingURL=SessionModel.js.map