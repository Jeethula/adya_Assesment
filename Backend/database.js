const Sequlize = require('sequelize');
require('dotenv').config();


user = process.env.DB_USERNAME;
password = process.env.DB_PASSWORD;

const sequelize = new Sequlize("db_aa871c_raguanu", user, password, {
     host: 'mysql8010.site4now.net',
   //host: 'localhost',
    dialect: "mysql",
    logging: false,
    timezone: '+05:30'
}) 


module.exports = sequelize