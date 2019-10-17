import * as Yup from 'yup';
import { serverLogger as logger } from './Logger';
var Env;
(function (Env) {
    Env["Development"] = "development";
    Env["Production"] = "production";
})(Env || (Env = {}));
/**
 * Execute validation in all environment properties necessary to do a correct system initialization.
 * @author Leonardo Otoni
 */
class BootstrapValidator {
    constructor() {
        this.schema = Yup.object().shape({
            nodeEnv: Yup.string().required().oneOf([Env.Development, Env.Production]),
            logPath: Yup.string().required('Environment var LOG_PATH not defined.'),
            dbType: Yup.string().required('Environment var DB_TYPE not defined.').oneOf(['postgres', 'mysql']),
            dbHost: Yup.string().required('Environment var DB_HOST not defined.'),
            dbPort: Yup.string().required('Environment var DB_PORT not defined.')
                .matches(/^[1-9]\d*$/, 'Environment var DB_PORT has to be a positive number.'),
            dbName: Yup.string().required('Environment var DB_NAME not defined.'),
            dbUsername: Yup.string().required('Environment var DB_USERNAME not defined.'),
            dbPassword: Yup.string().required('Environment var DB_PASSWORD not defined.'),
            dbLogging: Yup.boolean().required('Environment var DB_LOGGING not defined.'),
            serverKey: Yup.string().required('Environment var SERVER_KEY not defined')
                .min(32, 'Environment var SERVER_KEY needs min 32 characters length.'),
        });
    }
    /**
     * Validate all application env vars
     */
    async isValid() {
        // Create an schema instance to validate.
        const envVars = {
            nodeEnv: process.env.NODE_ENV,
            logPath: process.env.LOG_PATH,
            dbType: process.env.DB_TYPE,
            dbHost: process.env.DB_HOST,
            dbPort: process.env.DB_PORT,
            dbName: process.env.DB_NAME,
            dbUsername: process.env.DB_USERNAME,
            dbPassword: process.env.DB_PASSWORD,
            dbLogging: Boolean(process.env.DB_LOGGING),
            serverKey: process.env.SERVER_KEY,
        };
        try {
            logger.info('Validating environment variables...');
            await this.schema.validate(envVars, { abortEarly: false });
            return true;
        }
        catch (error) {
            error.errors.forEach((e) => {
                logger.error(e);
            });
        }
        return false;
    }
}
export default new BootstrapValidator();
//# sourceMappingURL=BootstrapValidator.js.map