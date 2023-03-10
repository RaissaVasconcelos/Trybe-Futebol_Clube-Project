import { Request, Response } from 'express';
import MachesService from '../service/Matches.service';

export default class MatchesControlles {
  static async getAll(req: Request, res: Response): Promise<void> {
    const value = req.query.inProgress;
    if (value) {
      const { statusCode, message } = await MachesService.getAllFilter(value as string);
      res.status(statusCode).json(message);
    }
    const { statusCode, message } = await MachesService.getAllMatches();
    res.status(statusCode).json(message);
  }

  static async createMatches(req: Request, res: Response): Promise<void> {
    const { statusCode, message } = await MachesService.createMatches(req.body);
    res.status(statusCode).json(message);
  }

  static async matchesFinish(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { statusCode, message } = await MachesService.matchesFinish(Number(id));
    res.status(statusCode).json({ message });
  }

  static async matchesUpdate(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { statusCode, message } = await MachesService.updateMatches(Number(id), req.body);
    res.status(statusCode).json(message);
  }
}
