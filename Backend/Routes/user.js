const express = require('express');
const userRoutes = express.Router()
const { CreateUser, updateUser, UserLogin } = require('../controller/user');

userRoutes.post('/create', CreateUser);
userRoutes.patch('/update', updateUser)
userRoutes.get('/Login', UserLogin)

module.exports = userRoutes