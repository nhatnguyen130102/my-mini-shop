//@ts-check
import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI
    || `mongodb+srv://nhat130102:PasSWorD_130102@cluster0.03nlvrx.mongodb.net/minishop?appName=Cluster0`;

  if (!uri) {
    throw new Error('MongoDB URI is missing. Set MONGODB_URI or DB_* env variables.');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    // options are mostly auto-detected in modern drivers
  });

  console.log('✅ Connected to MongoDB');
}
