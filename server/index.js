import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import campgroundRoutes from './routes/campgrounds.js';
import userRoutes from './routes/users.js';


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
dotenv.config();

app.use('/campgrounds', campgroundRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;

const databaseUrl = process.env.LOCAL_MONGO_DB_URL || process.env.CONNECTION_URL


mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
    .catch((error) => console.log(error.message));