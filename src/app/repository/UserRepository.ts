import { EntityRepository, Repository } from 'typeorm';

import User from '../entity/User';
import { logger } from '../../services/Logger';

/**
 * User Repository Class
 * @author Leonardo Otoni
 */
@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  /**
   * Fetch a user data by email. This method is strictly used by the authentication process,
   * returning user hash, login atempts and lastLogin date.
   * @param email
   */
  public async getUserLoginData(email: string): Promise<User | undefined> {
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
  public async doesUserEmailExists(email: string): Promise<boolean> {
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
  public async listUsers(limit: number, offset: number): Promise<object> {
    logger.debug(`UserRepository - listUsers: Offset:${offset} - Limit ${limit}`);
    const [users, count] = await this.findAndCount({
      select: ['id', 'name', 'email'],
      skip: offset,
      take: limit,
    });

    logger.debug(`Query returned ${users.length} records:`, users);
    return { users, count };
  }

  /**
   * Verifies if a given userId exists in the database
   * @param userId
   */
  public async isUserExist(userId: number): Promise<boolean> {
    const user = await this.createQueryBuilder()
      .select('user.id')
      .from(User, 'user')
      .where('user.id = :userId', { userId })
      .getOne();
    return user !== undefined;
  }
}
