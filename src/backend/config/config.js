require('dotenv').config();
const env = process.env;

const development = {
    username: env.SEQUELIZE_DEV_USERNAME || 'root',
    password: env.SEQUELIZE_DEV_PASSWORD || '3d720307',
    database: env.SEQUELIZE_DEV_DATABASE || '7shop',
    host: env.SEQUELIZE_DEV_HOST || '127.0.0.1',
    dialect: env.SEQUELIZE_DEV_DIALECT || 'mysql',
    logging: false,
};

const test = {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
};

const production = {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
};

// const jwtConfig = {
//     secretKey: env.JWT_SECRETKEY || 'cleaning',
//     option: {
//         algorithm: env.JWT_ALGORITHM || 'HS256',
//         expiresIn: env.JWT_EXPIRESIN || '60m',
//     },
// };

// export default { development, test, production, jwtConfig };
module.exports = { development, test, production }
