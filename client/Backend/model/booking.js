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
   startDate:{
    type:DataTypes.DATE, 

   },
   endDate: {
    type:DataTypes.DATE, 
    
   }
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