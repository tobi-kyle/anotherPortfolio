import Contact from '../models/contact.js';

export const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

export const getById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.json(contact);
};

export const create = async (req, res) => {
  const newContact = new Contact(req.body);
  await newContact.save();
  res.status(201).json(newContact);
};

export const update = async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedContact);
};

export const remove = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted' });
};

export const removeAll = async (req, res) => {
  await Contact.deleteMany();
  res.json({ message: 'All contacts deleted' });
};
