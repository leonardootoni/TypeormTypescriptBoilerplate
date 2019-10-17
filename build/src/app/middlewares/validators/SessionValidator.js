import * as Yup from 'yup';
const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(6),
});
/**
 * Session Request entry point validator. It follows the same naming convention from Controller
 * classes.
 * @author Leonardo Otoni
 */
class SessionValidator {
    async store(req, res, next) {
        const userData = Object.assign({}, req.body);
        try {
            await schema.validate(userData, { abortEarly: false });
        }
        catch (error) {
            return res.status(400).json(error.errors);
        }
        return next();
    }
}
export default new SessionValidator();
//# sourceMappingURL=SessionValidator.js.map