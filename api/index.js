import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authroutes from './routes/auth,routes.js';
dotenv.config();


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });
  const PORT = process.env.PORT;
  const app = express();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use('/api/user', userRouter);
  app.use('/api/auth', authroutes)

  