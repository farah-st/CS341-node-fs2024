//This code sets up a router in an Express application to handle HTTP requests related to contacts

const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// Route to retrieve all contacts
router.get('/', contactsController.getAll);

// Route to retrieve a single contact by ID
router.get('/:id', contactsController.getSingle);

// Route to create a new contact
router.post('/', contactsController.createContact);

module.exports = router;