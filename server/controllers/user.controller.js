import User from '../models/user.model.js';
import extend from 'lodash/extend.js';
import { getErrorMessage } from './error.controller.js';
import mongoose from "mongoose";


export const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Creating user:', { name, email }, 'DB:', mongoose.connection.db.databaseName);
    const user = new User({
      name,
      email,
      password,
      created: new Date(),
      updated: new Date(),
    });
    const savedUser = await user.save();
    console.log('User saved:', savedUser, 'DB:', mongoose.connection.db.databaseName);
    return res.status(200).json({ message: "Successfully signed up!" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

export const list = async (req, res) => {
  try {
    const users = await User.find().select('name email updated created');
    console.log('Users fetched:', users, 'DB:', mongoose.connection.db.databaseName);
    res.json(users);
  } catch (err) {
    console.error("❌ List error:", err);
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

export const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(400).json({ error: 'User not found' });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve user' });
  }
};

export const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

export const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};

export const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: getErrorMessage(err),
    });
  }
};