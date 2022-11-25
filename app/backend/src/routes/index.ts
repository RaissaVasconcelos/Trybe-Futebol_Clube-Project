import { Router } from 'express';
import loginRoute from './login.route';

const route = Router();

route.use('/login', loginRoute);

export default route;
