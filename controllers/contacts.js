const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
    const lists = await result.toArray();
    if (lists.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    // Validate input data
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required fields' });
    }

    // Create new contact object
    const newContact = {
      name,
      email,
      phone
    };

    // Insert new contact into the database
    const result = await mongodb.getDb().db().collection('contacts').insertOne(newContact);

    // Extract the ID of the newly created contact
    const newContactId = result.insertedId;

    // Send the ID of the newly created contact and a 201 status
    res.status(201).json({ id: newContactId });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
};


module.exports = { getAll, getSingle, createContact };
