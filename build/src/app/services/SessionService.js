import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import bcrypt from 'bcryptjs';
import TokenConfig from '../../config/AuthConfig';
import User from '../entity/User';
import { logger } from '../../services/Logger';
class SessionService {
    /**
     * Signup a user and generate a Authentication Token
     * @param Login
     */
    async signup(userLogin) {
        const { email, password } = userLogin;
        const user = await getConnection().createQueryBuilder()
            .select(['user.id', 'user.name', 'user.email', 'user.hash'])
            .from(User, 'user')
            .where('user.email = :email', { email })
            .getOne();
        if (!user) {
            throw new Error('User does not exists');
        }
        if (!(await bcrypt.compare(password, user.hash))) {
            throw new Error('Invalid Password');
        }
        try {
            const { id } = user;
            user.token = jwt.sign({ id }, TokenConfig.secret, { expiresIn: TokenConfig.expiresIn });
            return user;
        }
        catch (error) {
            logger.error(`Failed to generate JWT Token:\r\n${error}`);
            throw error;
        }
    }
}
export default new SessionService();
//# sourceMappingURL=SessionService.js.map