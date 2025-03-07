import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectTerrainDb } from './core/db';
import RegisterApplication from './application/RegisterApplication';

new RegisterApplication();

import routes from './api/routes';
import { errorHandler } from './api/middleware/errorHandler';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import compression from 'compression';

dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:8081'];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
});

connectTerrainDb();

app.use(helmet());
app.use(limiter);
app.use(cors(corsOptions));
if (process.env.NODE_ENV === 'production') {
    app.use(compression());
}
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

routes.forEach((route) => app.use(route));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

