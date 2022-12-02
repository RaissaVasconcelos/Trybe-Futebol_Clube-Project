import { Request, Response } from 'express';
import Leaderboard from '../service/Leaderboard.service';

export default class LeaderboardController {
  static async getAll(_req: Request, res: Response) {
    const { statusCode, message } = await Leaderboard.getAllLeaderboard();
    res.status(statusCode).json(message);
  }

  static async getAllFilter(req: Request, res: Response) {
    const path = req.path.replace('/', '');
    const { statusCode, message } = await Leaderboard.getAllLeaderboardFilter(path);
    res.status(statusCode).json(message);
  }
}
