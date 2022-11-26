import { Router } from 'express';
import loginRoute from './login.route';
import teamsRoute from './teams.route';

const route = Router();

route.use('/login', loginRoute);
route.use('/teams', teamsRoute);

export default route;
