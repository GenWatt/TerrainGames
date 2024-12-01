import { Router } from 'express';
import auth from './auth/auth';
import { TripRouter } from './trip';

const routes: Router[] = [
    auth,
    TripRouter
];

export default routes;

