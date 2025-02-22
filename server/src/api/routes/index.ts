import { Router } from 'express';
import { AuthRouter } from './auth';
import { TripRouter } from './trip';
import { SettingsRouter } from './settings';
import { WeatherRouter } from './weather';

const routes: Router[] = [
    AuthRouter,
    TripRouter,
    SettingsRouter,
    WeatherRouter
];

export default routes;

