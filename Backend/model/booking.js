const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./user')
const House = require('./house')

const Booking = sequelize.define("booking", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
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
            isNumeric: true,
            len: [10, 10]
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
    rent:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Advance:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    area:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'booking',
});

// You can add any associations or additional configurations here

// Create the table in the database
User.hasMany(Booking, {
    onDelete: 'cascade', // Prevent user deletion if associated GuestHouse exist
})
House.hasMany(Booking, {
    onDelete: 'cascade',}
)
module.exports = Booking;