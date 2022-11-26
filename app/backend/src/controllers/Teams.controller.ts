import { Request, Response } from 'express';
import TeamsService from '../service/Teams.service';

export default class TeamsControlles {
  static async getAllTeams(_req: Request, res: Response): Promise<void> {
    const { statusCode, message } = await TeamsService.getAllTeams();
    res.status(statusCode).json(message);
  }

  static async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { statusCode, message } = await TeamsService.getById(Number(id));
    res.status(statusCode).json(message);
  }
}
