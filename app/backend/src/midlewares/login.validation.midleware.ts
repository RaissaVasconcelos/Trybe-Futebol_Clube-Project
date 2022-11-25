import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces/user.interface';
import ErrorHttp, { HttpCode } from '../error/errorHttp';
import schemaUsers from '../utils/schema.joi';

const validationEmailPassword = (user: ILogin): void => {
  const { error } = schemaUsers.validate(user);
  console.log('error', error);
  if (error) throw new ErrorHttp(HttpCode.BAD_REQUEST, error.message);
};

const validateLogin = (req: Request, _res: Response, next: NextFunction): void => {
  validationEmailPassword(req.body);

  next();
};

export default validateLogin;
