import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

import { getConnection } from 'typeorm';
import { UserData } from '../../interfaces/User';
import UserRepository from '../../repository/UserRepository';
import { logger } from '../../../services/Logger';

const storeSchema: Yup.ObjectSchema<UserData> = Yup.object().shape<UserData>({
  name: Yup.string().required().max(50),
  email: Yup.string().required().email().max(50),
  password: Yup.string().required().min(6).max(20),
  confirmPassword: Yup.string().min(6).max(20)
    .oneOf([Yup.ref('password')], 'Password and Password Confirmation fields do not match.'),
  blocked: Yup.boolean().required(),
});

/**
 * Do not consider user password because it is already encrypted into the database.
 * Password will be changed only through forgotPassword or changePassword Controllers.
 */
const updateSchema: Yup.ObjectSchema<UserData> = Yup.object().shape<UserData>({
  id: Yup.number().required(),
  name: Yup.string().required().max(50),
  email: Yup.string().required().email().max(50),
  blocked: Yup.boolean().required(),
});

const deleteSchema: Yup.ObjectSchema = Yup.object().shape({
  id: Yup.number().required(),
});


/**
 * User APIs Validator
 * @author Leonardo Otoni
 */
class UserValidator {
  /**
   * [Post] /users Validator
   * @param req
   * @param res
   * @param next
   */
  public async store(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const userData: UserData = { ...req.body as UserData };
    userData.blocked = false; // Always considers a new user as blocked=false

    try {
      await storeSchema.validate(userData, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ message: error.errors });
    }

    const userExists = await getConnection()
      .getCustomRepository(UserRepository).doesUserEmailExists(userData.email);
    if (userExists) {
      return res.status(400).json({ message: 'User email is alredy in use.' });
    }

    return next();
  }

  /**
   * [Update] /users Validator
   * @param req
   * @param res
   * @param next
   */
  public async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const userData = { ...req.body as UserData };
    try {
      userData.id = parseInt(req.params.id, 10);
      await updateSchema.validate(userData, { abortEarly: false });
    } catch (error) {
      return res.status(400).json(error.errors);
    }

    if (await getConnection().getCustomRepository(UserRepository)
      .doesUserEmailExists(userData.email)) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    return next();
  }

  /**
   * [Delete] /users Validator
   * @param req
   * @param res
   * @param next
   */
  public async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    logger.debug('[Delete] /users - Validator');

    try {
      await deleteSchema.validate(req.params);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }

    return next();
  }
}

export default new UserValidator();
