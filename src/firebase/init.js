const protectSecretValue = (val) =>
    `${val.slice(0, 5)} ... ${val.slice(-5)}`;

const sanitizeConfig = (config) =>
    Object.keys(config)
        .reduce((acc, key) => ({
            ...acc,
            [key]: protectSecretValue(config[key]),
        }), {});

export const getConfig = async () => {
    const { default: firebaseConfig } = await import(process.env.NEXT_PUBLIC_FIREBASE_CONFIG_JSON);
    console.log('Initializiing firebase with config: ', sanitizeConfig(firebaseConfig));
    return firebaseConfig;
};

