import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/connectDB.js';
dotenv.config();
import userRoutes from './routes/user.routes.js';
import sellerRoutes from './routes/seller.routes.js';

const app = express();

connectDB();
const allowedOrigins = ['http://localhost:5173'];


app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user', userRoutes);
app.use('/api/seller', sellerRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});