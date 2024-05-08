const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user');

const House = sequelize.define("House", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    sellerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isInt: { msg: "Phone number must be numeric" },
            len: { args: [10, 10], msg: "Phone number must be 10 digits long" }
        },
    },
    furnishing: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rent: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Advance: { 
        type: DataTypes.INTEGER,
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'house',
});

User.hasMany(House);
House.belongsTo(User);

module.exports = House;
