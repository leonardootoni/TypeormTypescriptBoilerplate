import * as Yup from 'yup';
import { getConnection } from 'typeorm';
import UserRepository from '../../repository/UserRepository';
import { logger } from '../../../services/Logger';
const storeSchema = Yup.object().shape({
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
const updateSchema = Yup.object().shape({
    id: Yup.number().required(),
    name: Yup.string().required().max(50),
    email: Yup.string().required().email().max(50),
    blocked: Yup.boolean().required(),
});
const deleteSchema = Yup.object().shape({
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
    async store(req, res, next) {
        const userData = Object.assign({}, req.body);
        userData.blocked = false; // Always considers a new user as blocked=false
        try {
            await storeSchema.validate(userData, { abortEarly: false });
        }
        catch (error) {
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
    async update(req, res, next) {
        const userData = Object.assign({}, req.body);
        try {
            userData.id = parseInt(req.params.id, 10);
            await updateSchema.validate(userData, { abortEarly: false });
        }
        catch (error) {
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
    async delete(req, res, next) {
        logger.debug('[Delete] /users - Validator');
        try {
            await deleteSchema.validate(req.params);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
        return next();
    }
}
export default new UserValidator();
//# sourceMappingURL=UserValidator.js.map