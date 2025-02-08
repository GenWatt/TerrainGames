import { Router } from 'express';
import auth from './auth/auth';
import { TripRouter } from './trip';
import { SettingsRouter } from './settings';

const routes: Router[] = [
    auth,
    TripRouter,
    SettingsRouter
];

export default routes;

