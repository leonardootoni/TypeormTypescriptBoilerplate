import * as Yup from 'yup';

import { serverLogger as logger } from './Logger';

/**
 * Defines all the environment variables to be validated
 */
type Environment = {
    nodeEnv: string | undefined;
    logPath: string | undefined;
}

/**
 * Execute validation in all properties of Environment type instance.
 */
class EnvironmentValidator {
    private schema: Yup.ObjectSchema<Environment> = Yup.object().shape({
      nodeEnv: Yup.string().required().oneOf(['production', 'development']),
      logPath: Yup.string().required(),
    });

    /**
     * Validate all application env vars
     */
    public async isValid(): Promise<boolean> {
      const envVars: Environment = {
        nodeEnv: process.env.NODE_ENV,
        logPath: process.env.LOG_PATH,
      };

      try {
        logger.info('Validating environment variables...');
        await this.schema.validate(envVars, { abortEarly: false });
        return true;
      } catch (error) {
        error.errors.forEach((e: string) => {
          logger.error(e);
        });
      }

      return false;
    }
}

export default new EnvironmentValidator();
