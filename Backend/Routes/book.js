const express = require('express');
const bookRoutes = express.Router()

const controller = require('../controller/booking')

bookRoutes.post('/create', controller.createbook);
bookRoutes.get('/get', controller.getBooking);
bookRoutes.get('/get/:id', controller.getBookingByUser);


module.exports = bookRoutes