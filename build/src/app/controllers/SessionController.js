import SessionModel from '../models/SessionModel';
/**
 * Authentication Controller Class
 * @author Leonardo Otoni
 */
class SessionController {
    /**
     * Perform the User authentication. If the credentials are valid, It will create and return a
     * JSON Web Token having userId as JWT Payload and User{id, name, email} as response.
     * @param req
     * @param res
     */
    async store(req, res) {
        const userLogin = Object.assign({}, req.body);
        let user;
        try {
            const sm = new SessionModel();
            user = await sm.signUp(userLogin);
        }
        catch (error) {
            return res.status(401).json({ messsage: 'Invalid credentials.' });
        }
        const { id, name, email, token } = user;
        return res.json({ user: { id, name, email }, token });
    }
}
export default new SessionController();
//# sourceMappingURL=SessionController.js.map