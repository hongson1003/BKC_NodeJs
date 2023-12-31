const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT,
    'logging': false,
    port: process.env.DB_PORT,
    dialectOptions:
        process.env.DB_SSL === 'true' ?
            {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            } : {}
    ,
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDB;