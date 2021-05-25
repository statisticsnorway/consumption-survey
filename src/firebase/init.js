const protectSecretValue = (val) =>
    `${val.slice(0, 5)} ... ${val.slice(-5)}`;

const sanitizeConfig = (config) =>
    Object.keys(config)
        .reduce((acc, key) => ({
            ...acc,
            [key]: protectSecretValue(config[key]),
        }), {});

