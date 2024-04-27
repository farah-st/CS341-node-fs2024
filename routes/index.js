const routes = require('express').Router();

const myController = require('../controllers')
routes.get('/', myController.ControllerFunction);

//to connect to controllers below using the above example

module.exports = routes;