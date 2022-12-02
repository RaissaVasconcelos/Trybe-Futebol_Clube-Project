import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const route = Router();

route.get('/home', LeaderboardController.getAllFilter);
route.get('/away', LeaderboardController.getAllFilter);
route.get('/', LeaderboardController.getAll);

export default route;
