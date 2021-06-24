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
        logpkg.trace(msgWithFormat, ...rest);
    },
    debug: (msgWithFormat, ...rest) => {
        CONSOLE_LOGGER.debug(msgWithFormat, ...rest);
        logpkg.debug(msgWithFormat, ...rest);
    },
    info: (msgWithFormat, ...rest) => {
        CONSOLE_LOGGER.info(msgWithFormat, ...rest);
        logpkg.info(msgWithFormat, ...rest);
    },
    warn: (msgWithFormat, ...rest) => {
        CONSOLE_LOGGER.warn(msgWithFormat, ...rest);
        logpkg.warn(msgWithFormat, ...rest);
    },
    error: (msgWithFormat, ...rest) => {
        CONSOLE_LOGGER.error(msgWithFormat, ...rest);
        logpkg.error(msgWithFormat, ...rest);
    },
});
