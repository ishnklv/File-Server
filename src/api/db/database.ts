import mongoose from 'mongoose';
import { ConfigService } from '../../shared/config.service';

export const connectMongoDB = async () => {
  try {
    const config = new ConfigService();
    const DB_URL = config.getEnv('MONGODB_URI') || 'mongodb://localhost:27017/file_server';
    return await mongoose.connect(DB_URL);
  } catch (err) {
    console.log('Connect to mongodb', err);
  }
}
