const express = require('express');
const appController = require('./../appController');

const Router = express.Router();

Router.post('/app', appController.postApp);

Router.get('/app', appController.getApps);
Router.get('/app/featured', appController.getFeaturedApp);

Router.put('/app/:id', appController.putApp);

Router.delete('/app/:id', appController.deleteApp);

module.exports = Router;