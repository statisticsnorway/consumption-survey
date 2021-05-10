const protectSecretValue = (val) =>
    `${val.slice(0, 5)} ... ${val.slice(-5)}`;

export const sanitizeConfig = (config) =>
    Object.keys(config)
        .reduce((acc, key) => ({
            ...acc,
            [key]: protectSecretValue(config[key]),
        }), {});

export const loadConfig = async (configFile) => {
    console.log('Loading firebaseConfig from', configFile);
    // const {default: firebaseConfig} = await import(configFile);
    const firebaseConfig = require(configFile);
    console.log('Initializiing firebase with config: ', sanitizeConfig(firebaseConfig));
    return firebaseConfig;
};

export const loadFromEnvVars = (envVars, prefix = null, removePrefix = true) =>
    Object.keys(envVars)
        .filter(key => prefix ? key.startsWith(prefix) : true)
        .reduce((acc, key) => ({
            ...acc,
            [(prefix && removePrefix) ? key.replace(prefix, '') : key]: envVars[key]
        }), {});
