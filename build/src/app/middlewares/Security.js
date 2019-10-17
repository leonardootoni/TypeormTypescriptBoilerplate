import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import TokenConfig from '../../config/AuthConfig';
/**
 * General Security Middleware
 * @author: Leonardo Otoni
 */
class Security {
    /**
     * Validate whether a authentication Bearer is present in the Request Header as well as if it is
     * valid. Otherwise reject the request.
     * @param req
     * @param res
     * @param next
     */
    async checkCredentials(req, res, next) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }
        const [, token] = authorization.split(' ');
        try {
            const decoded = await promisify(jwt.verify)(token, TokenConfig.secret);
            req.userId = decoded.id;
        }
        catch (error) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        return next();
    }
}
export default new Security();
//# sourceMappingURL=Security.js.map