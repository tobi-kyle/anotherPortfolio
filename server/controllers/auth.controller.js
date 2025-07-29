import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import mongoose from "mongoose";


export const signin = async (req, res) => {
  try {
    console.log('Signin attempt for email:', req.body.email, 'DB:', mongoose.connection.db.databaseName);
    let user = await User.findOne({ email: req.body.email });
    console.log('User found:', user);
    if (!user) return res.status(401).json({ error: 'User not found' });
    if (!user.authenticate(req.body.password)) return res.status(401).json({ error: "Email and password don't match." });

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );
    res.cookie('t', token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("❌ Signin error:", err);
    return res.status(401).json({ error: "Could not sign in" });
  }
};

export const signout = (req, res) => {
  res.clearCookie('t');
  return res.json({ message: 'Signed out successfully' });
};