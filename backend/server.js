import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config();


import dns from "node:dns/promises";   
dns.setServers(["1.1.1.1", "1.0.0.1"]); 
// Spin up express container instance 
const app = express();

// Middleware parameters
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json()); // Essential body parsing parser rule

// Connection state execution
connectDB();

// Explicit routing layer bindings
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sarab Restaurant API Server actively serving on port: ${PORT}`));