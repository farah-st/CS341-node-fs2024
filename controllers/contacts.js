const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res, next) => {
  try {
    const contactsCollection = mongodb.getDb().db().collection('contacts');
    const result = await contactsCollection.find().toArray();
    res.json(result);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contactsCollection = mongodb.getDb().db().collection('contacts');
    const contact = await contactsCollection.findOne({ _id: userId });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required fields' });
    }

    const newContact = { name, email, phone };
    const contactsCollection = mongodb.getDb().db().collection('contacts');
    const result = await contactsCollection.insertOne(newContact);
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required fields' });
    }

    const updatedContact = { name, email, phone };
    const contactsCollection = mongodb.getDb().db().collection('contacts');
    const result = await contactsCollection.updateOne({ _id: userId }, { $set: updatedContact });

    if (result.modifiedCount === 0) {
      console.error('Contact not found for update:', userId);
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contactsCollection = mongodb.getDb().db().collection('contacts');
    const result = await contactsCollection.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      console.error('Contact not found for deletion:', userId);
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};


module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
