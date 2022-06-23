const express = require('express');
const user = require('../../Model/user');
const userController = require('./../userController');

const Router = express.Router();

Router.post('/user/add-app/:userId/:appId', userController.addAppToUser);
Router.post('/user', userController.postSignup);
Router.post('/user/login', userController.postLogin);
Router.post('/createorder', userController.createOrder);
Router.post('/user/remove-app/:userId/:appId', userController.removeAppFromUser);
Router.get('/user/:id', userController.getUser);
Router.get('/user', userController.getAllUser);

Router.put('/user/:id', userController.putUser);

Router.delete('/user/:id', userController.deleteUser);

module.exports = Router;