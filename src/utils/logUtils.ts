import { CONSOLE_LOGGER } from './LogProvider';

export type LoggerType = {
    trace: (msgWithFormat, ...rest) => void;
    debug: (msgWithFormat, ...rest) => void;
    info: (msgWithFormat, ...rest) => void;
    warn: (msgWithFormat, ...rest) => void;
    error: (msgWithFormat, ...rest) => void;
};

export const getLogger = (logpkg): LoggerType => ({
    trace: (msgWithFormat, ...rest) => {
        CONSOLE_LOGGER.trace(msgWithFormat, ...rest);
        try {
            logpkg.trace(msgWithFormat, ...rest);
        } catch (err) {
            CONSOLE_LOGGER.error('could not log to remote (offline?)');
        }
    },
    debug: (msgWithFormat, ...rest) => {
        CONSOLE_LOGGER.debug(msgWithFormat, ...rest);
        try {
            logpkg.debug(msgWithFormat, ...rest);
        } catch (err) {
            CONSOLE_LOGGER.error('could not log to remote (offline?)');
        }
    },
    info: (msgWithFormat, ...rest) => {
        CONSOLE_LOGGER.info(msgWithFormat, ...rest);
        try {
            logpkg.info(msgWithFormat, ...rest);
        } catch (err) {
            CONSOLE_LOGGER.error('could not log to remote (offline?)');
        }
    },
    warn: (msgWithFormat, ...rest) => {
        CONSOLE_LOGGER.warn(msgWithFormat, ...rest);
        try {
            logpkg.warn(msgWithFormat, ...rest);
        } catch (err) {
            CONSOLE_LOGGER.error('could not log to remote (offline?)');
        }
    },
    error: (msgWithFormat, ...rest) => {
        CONSOLE_LOGGER.error(msgWithFormat, ...rest);
        try {
            logpkg.error(msgWithFormat, ...rest);
        } catch (err) {
            CONSOLE_LOGGER.error('could not log to remote (offline?)');
        }
    },
});
