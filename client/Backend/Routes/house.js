const express = require('express');
const houseRoutes = express.Router()

const controller = require('../controller/house')

houseRoutes.post('/create', controller.createHouse);


//to get transport form


houseRoutes.get('/get', controller.createHouse);

//to update the Transportform
houseRoutes.patch('/update', controller.updateHouse);
houseRoutes.delete('/delete', controller.deleteHouse);
houseRoutes.get('/checkAvailabiltyForHouse',controller.checkAvailabilityHouse)
houseRoutes.get('/checkAvailability', controller.checkAvailability)


module.exports = houseRoutes