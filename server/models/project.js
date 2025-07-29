import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String // <-- For base64 string or image URL
});

export default mongoose.model('Project', projectSchema);
