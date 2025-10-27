import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-blog';
    
    await mongoose.connect(mongoUri);
    
    console.log('✅ MongoDB підключено успішно');
  } catch (error) {
    console.error('❌ Помилка підключення до MongoDB:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB відключено');
});

mongoose.connection.on('error', (error) => {
  console.error('Помилка MongoDB:', error);
});