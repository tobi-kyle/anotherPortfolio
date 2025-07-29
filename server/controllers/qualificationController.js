import Qualification from '../models/qualification.js';

export const getAll = async (req, res) => {
  const items = await Qualification.find();
  res.json(items);
};

export const getById = async (req, res) => {
  const item = await Qualification.findById(req.params.id);
  res.json(item);
};

export const create = async (req, res) => {
  const newItem = new Qualification(req.body);
  await newItem.save();
  res.status(201).json(newItem);
};

export const update = async (req, res) => {
  const updated = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const remove = async (req, res) => {
  await Qualification.findByIdAndDelete(req.params.id);
  res.json({ message: 'Qualification deleted' });
};

export const removeAll = async (req, res) => {
  await Qualification.deleteMany();
  res.json({ message: 'All qualifications deleted' });
};
