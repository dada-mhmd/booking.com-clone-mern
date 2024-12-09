import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import 'dotenv/config';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'


const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// deployment
if(process.env.NODE_ENV==='production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  connectDB();
});
