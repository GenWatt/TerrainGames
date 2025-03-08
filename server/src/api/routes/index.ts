import { Router } from 'express';
import { AuthRouter } from '@api/routes/auth';
import { TripRouter } from '@api/routes//trip';
import { SettingsRouter } from '@api/routes//settings';
import { WeatherRouter } from '@api/routes//weather';

const routes: Router[] = [
    AuthRouter,
    TripRouter,
    SettingsRouter,
    WeatherRouter
];

export default routes;

