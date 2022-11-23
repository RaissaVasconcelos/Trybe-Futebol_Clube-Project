import { Request, Response } from 'express';
import UserService from '../service/User.service';

export default class UserController {
  static async login(req: Request, res: Response) {
    const result = await UserService.login(req.body);
    res.status(200).json({ result });
  }
}
