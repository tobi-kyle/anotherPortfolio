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
  try {
    const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;

    const newContact = new Contact({
      ...req.body,
      avatar: avatarPath,
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(500).json({ error: 'Server error creating contact' });
  }
};

export const update = async (req, res) => {
  try {
    const avatarPath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = {
      ...req.body,
    };

    // Only overwrite avatar if a new one was uploaded
    if (avatarPath) {
      updateData.avatar = avatarPath;
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updatedContact);
  } catch (err) {
    console.error("Error updating contact:", err);
    res.status(500).json({ error: 'Server error updating contact' });
  }
};

export const remove = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted' });
};

export const removeAll = async (req, res) => {
  await Contact.deleteMany();
  res.json({ message: 'All contacts deleted' });
};
