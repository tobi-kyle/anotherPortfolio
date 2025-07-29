import Project from '../models/project.js';
import mongoose from "mongoose";

export const getAll = async (req, res) => {
  const items = await Project.find();
  res.json(items);
};

export const getById = async (req, res) => {
  const item = await Project.findById(req.params.id);
  res.json(item);
};

export const create = async (req, res) => {
  try {
    console.log(">>> Creating project. DB NAME:", mongoose.connection.name);
    const newItem = new Project(req.body);
    await newItem.save();
    console.log(">>> Project saved:", newItem);
    res.status(201).json(newItem);
  } catch (err) {
    console.error(">>> Project CREATE ERROR:", err);
    res.status(400).json({ error: err.message, stack: err.stack });
  }
};

export const update = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const remove = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
};

export const removeAll = async (req, res) => {
  await Project.deleteMany();
  res.json({ message: 'All projects deleted' });
};
