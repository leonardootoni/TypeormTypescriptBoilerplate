var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { EntityRepository, Repository } from 'typeorm';
import User from '../entity/User';
import { logger } from '../../services/Logger';
/**
 * User Repository Class
 * @author Leonardo Otoni
 */
let UserRepository = class UserRepository extends Repository {
    /**
     * Fetch a user data by email. This method is strictly used by the authentication process,
     * returning user hash, login atempts and lastLogin date.
     * @param email
     */
    async getUserLoginData(email) {
        const user = await this.createQueryBuilder()
            .select([
            'user.id',
            'user.name',
            'user.email',
            'user.hash',
            'user.attempts',
            'user.lastLoginAttempt',
        ])
            .from(User, 'user')
            .where('user.email = :email and user.blocked=false', { email })
            .getOne();
        return user;
    }
    /**
     * Verify if a given email is already in use
     * Returns true if email alredy exists. Otherwise, return false.
     * @param email
     */
    async doesUserEmailExists(email) {
        const user = await this.createQueryBuilder()
            .select(['user.email'])
            .from(User, 'user')
            .where('user.email = :email', { email })
            .getOne();
        return user !== undefined;
    }
    /**
     * List users from database
     * @param limit
     * @param offset
     */
    async listUsers(limit, offset) {
        logger.debug(`Searching users Offset:${offset} - Limit ${limit}`);
        const users = await this.createQueryBuilder()
            .select(['user.id', 'user.name', 'user.email'])
            .from(User, 'user')
            .skip(offset)
            .limit(limit)
            .getMany();
        logger.debug(users);
        return users;
    }
    /**
     * Verifies if a given userId exists in the database
     * @param userId
     */
    async isUserExist(userId) {
        const user = await this.createQueryBuilder()
            .select('user.id')
            .from(User, 'user')
            .where('user.id = :userId', { userId })
            .getOne();
        return user !== undefined;
    }
};
UserRepository = __decorate([
    EntityRepository(User)
], UserRepository);
export default UserRepository;
//# sourceMappingURL=UserRepository.js.map