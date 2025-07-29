import mongoose from 'mongoose';
import app from './server/express.js'; 
import config from './config/config.js';

console.log(">>> USING MONGO URI:", config.mongoUri);

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB:", mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error("❌ Unable to connect to database:", err);
    process.exit(1);
  });

mongoose.connection.on('error', err => console.error('MongoDB error:', err));
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Portfolio API." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.info(`🚀 Server started on port ${PORT}`);
});

export default app;