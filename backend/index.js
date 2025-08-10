import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/connectDB.js';
import { connectCloudinary } from './config/cloudinary.js';

dotenv.config();
import userRoutes from './routes/user.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import addressRoutes from './routes/address.routes.js';


const app = express();

connectDB();
connectCloudinary();
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
app.use('/api/product', productRoutes);
app.use("/api/cart",cartRoutes);
app.use('/api/order', orderRoutes);
app.use("/api/address",addressRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});