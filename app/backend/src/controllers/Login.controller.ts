import { Request, Response } from 'express';
import LoginService from '../service/Login.service';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { statusCode, message } = await LoginService.login(req.body);
    res.status(statusCode).json({ token: message });
  }
}
