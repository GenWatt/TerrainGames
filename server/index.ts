import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectTerrainDb } from './src/core/db';
import { container } from "./src/shared/DIContainer";
import TripRepository from "./src/core/repositories/TripRepository";
import ITripRepository from './src/domain/repositories/trips/ITripRepository';
import Mediator from './src/application/Mediator';
import path from 'path';
import AuthService from './src/services/AuthService';

container.register<ITripRepository>('TripRepository', new TripRepository());
container.register("Mediator", new Mediator());
container.register("AuthService", new AuthService());

const controllerPath = path.join(__dirname, 'src/api/controllers');
container.registerControllers(controllerPath);

import routes from './src/api/routes';
import { errorHandler } from './src/api/middleware/errorHandler';
import morgan from 'morgan';

dotenv.config();

const app = express();

connectTerrainDb();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes.forEach((route) => app.use(route));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

