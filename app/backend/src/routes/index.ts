import { Router } from 'express';
import loginRoute from './login.route';
import teamsRoute from './teams.route';
import matchesRoute from './matches.route';
import leaderboard from './leaderboard.route';

const route = Router();

route.use('/login', loginRoute);
route.use('/teams', teamsRoute);
route.use('/matches', matchesRoute);
route.use('/leaderboard', leaderboard);

export default route;
