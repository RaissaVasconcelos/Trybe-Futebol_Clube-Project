import { Router } from 'express';
import loginRoute from './login.route';
import teamsRoute from './teams.route';
import matchesRoute from './matches.route';

const route = Router();

route.use('/login', loginRoute);
route.use('/teams', teamsRoute);
route.use('/matches', matchesRoute);

export default route;
