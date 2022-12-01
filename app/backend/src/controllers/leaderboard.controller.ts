import { Request, Response } from 'express';
import Leaderboard from '../service/Leaderboard.service';

export default class LeaderboardController {
  static async getAll(req: Request, res: Response) {
    const path = req.path.replace('/', '');
    const { statusCode, message } = await Leaderboard.getAllLeaderboard(path);
    res.status(statusCode).json(message);
  }
}
