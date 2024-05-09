const express = require('express');
const houseRoutes = express.Router()

const controller = require('../controller/house');
const authenticateToken = require('../middleware/requireAuth');


houseRoutes.post('/create',controller.createHouse);
houseRoutes.get('/get', controller.getHouses);
houseRoutes.patch('/update', controller.updateHouse);
houseRoutes.delete('/delete/:id', controller.deleteHouse);
houseRoutes.get('/checkAvailabiltyForHouse',controller.checkAvailabilityHouse)
houseRoutes.get('/checkAvailability', controller.checkAvailability)



module.exports = houseRoutes