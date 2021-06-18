import logpkg from 'loglevel';
import remoteLogger from 'loglevel-plugin-remote';
import { LogContext } from '../uiContexts';
import { getLogger, LoggerType } from './logUtils';
import { useEffect, useState } from 'react';
import Loader from '../components/common/Loader';

const customJSON = log => ({
    msg: log.message,
    level: log.level.label,
    stacktrace: log.stacktrace
});

export const LOG_DEFAULTS = {
    url: `${process.env.NEXT_PUBLIC_BFF_HOST}/logger1`,
    level: 'debug',
    format: customJSON,
};

logpkg.enableAll();
remoteLogger.apply(logpkg, LOG_DEFAULTS);

const CONSOLE_LOGGER: LoggerType = {
    debug: console.log,
    error: console.error,
    info: console.info,
    warn: console.warn,
    trace: console.trace,
};

const LogProvider = ({children}) => {
    const [logger, setLogger] = useState<LoggerType>(null);

    useEffect(() => {
        setLogger(getLogger(logpkg));
    }, []);

    return logger ? (
        <LogContext.Provider value={{logger}}>
            {children}
        </LogContext.Provider>
    ) : <Loader />;
};

export default LogProvider;
