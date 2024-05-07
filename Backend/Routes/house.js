const express = require('express');
const guesthouseroutes = express.Router()

const { createGuestHouse, checkAvailability, getGuestHouses, updateGuestHouse, deleteGuestHouse } = require('../controller/guestHouseController')

guesthouseroutes.post('/create', createGuestHouse);


//to get transport form


guesthouseroutes.get('/get', getGuestHouses);

//to update the Transportform
guesthouseroutes.patch('/update', updateGuestHouse);
guesthouseroutes.delete('/delete', deleteGuestHouse);
guesthouseroutes.get('/checkAvailability', checkAvailability)


module.exports = guesthouseroutes