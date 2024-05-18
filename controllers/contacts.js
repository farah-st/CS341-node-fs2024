const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getContactFromBody = (body) => ({
  firstName: body.firstName,
  lastName: body.lastName,
  email: body.email,
  favoriteColor: body.favoriteColor,
  birthday: body.birthday
});

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  const contact = getContactFromBody(req.body);
  const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = getContactFromBody(req.body);
  const response = await mongodb.getDb().db().collection('contacts').replaceOne({ _id: userId }, contact);
  
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db().collection('contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Some error occurred while deleting the contact.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};



