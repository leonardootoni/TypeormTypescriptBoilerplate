import app from './app';
import { serverLogger as logger } from './config/Logger';

app.instance.listen(3333);
logger.info('Server Listening on port 3333');
