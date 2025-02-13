import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectTerrainDb } from './src/core/db';

import RegisterApplication from './src/application/RegisterApplication';

new RegisterApplication();

import routes from './src/api/routes';
import { errorHandler } from './src/api/middleware/errorHandler';
import morgan from 'morgan';

dotenv.config();

const app = express();

connectTerrainDb();

const allowedOrigins = ['http://localhost:8081', '']; // Add your allowed origins here

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes.forEach((route) => app.use(route));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

