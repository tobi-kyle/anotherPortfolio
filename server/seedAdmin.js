import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from './models/user.model.js';

console.log("Connecting to:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {});

const admin = new User({
  name: 'Admin',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin'
});

admin.save().then(() => {
  console.log('Admin user seeded.');
  mongoose.disconnect();
}).catch(err => {
  console.error(err);
  mongoose.disconnect();
});
