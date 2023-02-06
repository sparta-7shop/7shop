
const path = require('path')
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


module.exports = { development, test, production }
