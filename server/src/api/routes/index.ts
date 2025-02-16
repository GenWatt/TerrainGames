import { Router } from 'express';
import auth from './auth/auth';
import { TripRouter } from './trip';
import { SettingsRouter } from './settings';
import { WeatherRouter } from './weather';

const routes: Router[] = [
    auth,
    TripRouter,
    SettingsRouter,
    WeatherRouter
];

export default routes;

