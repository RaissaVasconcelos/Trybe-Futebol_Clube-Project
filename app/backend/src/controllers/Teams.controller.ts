import { Request, Response } from 'express';
import TeamsService from '../service/Teams.service';

export default class TeamsControlles {
  static async getAllTeams(req: Request, res: Response): Promise<void> {
    const { statusCode, message } = await TeamsService.getAllTeams();
    res.status(statusCode).json(message);
  }
}
