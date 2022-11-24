import { Request, Response } from 'express';
import UserService from '../service/User.service';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { statusCode, message } = await UserService.login(req.body);
    res.status(statusCode).json({ message });
  }
}
