import { Request, Response } from 'express';
import Leaderboard from '../service/Leaderboard.service';

export default class LeaderboardController {
  static async getAll(req: Request, res: Response) {
    const { statusCode, message } = await Leaderboard.getAllLeaderboard();
    res.status(statusCode).json({ token: message });
  }
}
