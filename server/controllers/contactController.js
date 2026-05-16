const Contact = require("../models/Contact");


// CREATE CONTACT MESSAGE
const createContact = async (req, res) => {

  try {

    const contact = await Contact.create(
      req.body
    );

    res.status(201).json(contact);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL CONTACTS
const getContacts = async (req, res) => {

  try {

    const contacts = await Contact.find();

    res.json(contacts);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createContact,
  getContacts,
};