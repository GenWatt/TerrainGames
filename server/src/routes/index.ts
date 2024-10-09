import { Router } from 'express';
import auth from './auth/auth';

const routes: Router[] = [
    auth,
];

export default routes;

