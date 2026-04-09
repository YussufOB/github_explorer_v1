export const getEnVar = (key, defaultValue = '') => {
    return process.env[key] || defaultValue;
};

export const ENV = {
    GITHUB_TOKEN: getEnVar('TOKEN'),
    APP_NAME: getEnVar('NAME'),
    IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
    IS_PRODUCTION: process.env.NODE_ENV === 'production'
};

export const getAPIHeaders = () => {
    return ENV.GITHUB_TOKEN ? { 'Authorization': `token ${ENV.GITHUB_TOKEN}` } : {};
};