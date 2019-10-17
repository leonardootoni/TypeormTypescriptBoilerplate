import { getLogger, configure } from 'log4js';
var Appender;
(function (Appender) {
    Appender["Development"] = "development";
    Appender["Production"] = "production";
    Appender["Server"] = "server";
})(Appender || (Appender = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel["debug"] = "debug";
    LogLevel["error"] = "error";
    LogLevel["info"] = "info";
})(LogLevel || (LogLevel = {}));
/**
 * Application Local Logger config.
 * It makes use of Log4js logger lib.
 * @author Leonardo Otoni
 */
class AppLogger {
    constructor() {
        this.appender = process.env.NODE_ENV === Appender.Production
            ? Appender.Production : Appender.Development;
        AppLogger.configureAppender();
    }
    /**
     * Define the logger appender accordingly to the ennvironment.
     * Production: Log.Level == error, Development: Log.Level == debug
     */
    static configureAppender() {
        configure({
            appenders: {
                fileAppender: {
                    type: 'file',
                    filename: AppLogger.logFileName,
                    keepFileExt: true,
                    layout: { type: 'pattern', pattern: '[%d] [%p] %m' },
                },
                console: { type: 'console', layout: { type: 'pattern', pattern: '%[[%d] [%p]%] %m' } },
            },
            categories: {
                default: { appenders: ['console', 'fileAppender'], level: LogLevel.debug },
                server: { appenders: ['console', 'fileAppender'], level: LogLevel.info },
                production: { appenders: ['fileAppender'], level: LogLevel.error },
            },
        });
    }
    /**
     * Returns a application logger
     * @param category - Optional - Alllows to select the Appender category directly.
     */
    getAppLogger(category) {
        if (category && category === Appender.Server) {
            return getLogger(Appender.Server);
        }
        if (this.appender === Appender.Production) {
            return getLogger(Appender.Production);
        }
        return getLogger(); // default appender
    }
}
/**
 * It considers a default log file anyways just because this class is instantiated before the
 * bootstrap validation.
 */
AppLogger.logFileName = process.env.LOG_PATH || 'application.log';
const appLogger = new AppLogger();
const serverLogger = appLogger.getAppLogger(Appender.Server);
const logger = appLogger.getAppLogger();
export { logger, serverLogger };
//# sourceMappingURL=Logger.js.map