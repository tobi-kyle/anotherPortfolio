import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  github: String,
  linkedin: String,
  message: String 
});

export default mongoose.model('Contact', contactSchema);
