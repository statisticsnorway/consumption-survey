export type LoggerType = {
    trace: (msgWithFormat, ...rest) => void;
    debug: (msgWithFormat, ...rest) => void;
    info: (msgWithFormat, ...rest) => void;
    warn: (msgWithFormat, ...rest) => void;
    error: (msgWithFormat, ...rest) => void;
};

export const getLogger = (logpkg): LoggerType => ({
    trace: (msgWithFormat, ...rest) => {
        logpkg.trace(msgWithFormat, ...rest);
    },
    debug: (msgWithFormat, ...rest) => {
        console.log('this should go to server', msgWithFormat, rest, logpkg);
        logpkg.debug(msgWithFormat, ...rest);
    },
    info: (msgWithFormat, ...rest) => {
        logpkg.info(msgWithFormat, ...rest);
    },
    warn: (msgWithFormat, ...rest) => {
        logpkg.warn(msgWithFormat, ...rest);
    },
    error: (msgWithFormat, ...rest) => {
        logpkg.error(msgWithFormat, ...rest);
    },
});
