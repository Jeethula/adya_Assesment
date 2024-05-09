const express = require('express');
const bookRoutes = express.Router()

const controller = require('../controller/booking');
const authenticateToken = require('../middleware/requireAuth');

bookRoutes.post('/create',authenticateToken, controller.createbook);
bookRoutes.get('/get',authenticateToken, controller.getBooking);
bookRoutes.get('/get/:username',authenticateToken, controller.getBookingByUser);


module.exports = bookRoutes