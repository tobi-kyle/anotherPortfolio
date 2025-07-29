import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../server/.env'); // Points to Redemption/server/.env

console.log('Attempting to load .env from:', envPath);

dotenv.config({ path: envPath });

console.log('Loaded .env:', process.env.MONGODB_URI ? 'MONGODB_URI found' : 'MONGODB_URI missing');

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  mongoUri: process.env.MONGODB_URI
};

if (!config.mongoUri) {
  console.error('❌ MONGODB_URI is not defined in .env at', envPath);
  process.exit(1);
}

export default config;