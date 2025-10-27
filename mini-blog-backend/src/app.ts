import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';


dotenv.config();


const app: Application = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Api works',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts'
    }
  });
});


app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`server runs on port ${PORT}`);
    });
  } catch (error) {
    console.error(' Server error:', error);
    process.exit(1);
  }
};

startServer();

export default app;