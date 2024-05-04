//This code sets up a router in an Express application to handle HTTP requests related to contacts

const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

module.exports = router;