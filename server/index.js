import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import AownerRoutes from './routes/AownerRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON data

// Use the user routes with a prefix
app.use('/user', userRoutes);
app.use('/owner', AownerRoutes);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const USERNAME = process.env.VITE_DB_USERNAME;
const PASSWORD = process.env.VITE_DB_PASSWORD;
Connection(USERNAME, PASSWORD);
