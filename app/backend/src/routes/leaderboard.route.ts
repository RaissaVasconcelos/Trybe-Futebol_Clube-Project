import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const route = Router();

route.get('/home', LeaderboardController.getAll);

export default route;
